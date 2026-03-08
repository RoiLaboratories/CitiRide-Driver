import { useEffect, useRef, useState } from "react";
import { Alert, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";
import { mapStyle } from "../../../components/styles/mapStyle";
import {
  CAMERA_CONFIG,
  centerMapToUser,
  checkUsableLocation,
  handleDeniedPermission,
  requestLocationPermission,
} from "../utils/location";
import LocationPromptModal from "./locationPromptModal";

interface MapProps {
  latitude?: number;
  longitude?: number;
}

const LAGOS_REGION: Region = {
  latitude: 6.5244,
  longitude: 3.3792,
  latitudeDelta: 0.001,
  longitudeDelta: 0.001,
};

const Map = ({
  latitude = LAGOS_REGION.latitude,
  longitude = LAGOS_REGION.longitude,
}: MapProps) => {
  const mapRef = useRef<MapView>(null);
  const [showPrePrompt, setShowPrePrompt] = useState(false);
  const [hasCheckedLocation, setHasCheckedLocation] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    let mounted = true;

    const runCheck = async () => {
      const hasUsableLocation = await checkUsableLocation();
      if (!mounted) return;

      if (hasUsableLocation) {
        setShowPrePrompt(false);
      } else {
        timer = setTimeout(() => {
          if (mounted) setShowPrePrompt(true);
        }, 2000);
      }

      setHasCheckedLocation(true);
    };

    runCheck();

    return () => {
      mounted = false;
      if (timer) clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!mapReady || !hasCheckedLocation) return;

    const recenterIfPossible = async () => {
      const hasUsableLocation = await checkUsableLocation();
      if (!hasUsableLocation) return;
      await centerMapToUser(mapRef, 1200);
    };

    recenterIfPossible();
  }, [mapReady, hasCheckedLocation]);

  const handleEnableLocation = async () => {
    setShowPrePrompt(false);

    const { status, canAskAgain } = await requestLocationPermission();
    if (status !== "granted") {
      await handleDeniedPermission(canAskAgain);
      return;
    }

    const centered = await centerMapToUser(mapRef, 3000);
    if (!centered) {
      Alert.alert(
        "Location unavailable",
        "Could not get your location right now.",
      );
    }
  };

  return (
    <View className="flex-1">
      <MapView
        ref={mapRef}
        onMapReady={() => setMapReady(true)}
        provider={PROVIDER_GOOGLE}
        initialCamera={{
          center: { latitude, longitude },
          ...CAMERA_CONFIG,
        }}
        style={{ flex: 1 }}
        customMapStyle={mapStyle}
        showsUserLocation
      />

      {hasCheckedLocation && (
        <LocationPromptModal
          visible={showPrePrompt}
          onSetLocation={handleEnableLocation}
          onLater={() => setShowPrePrompt(false)}
        />
      )}
    </View>
  );
};

export default Map;
