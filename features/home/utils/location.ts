import * as Location from "expo-location";
import { Alert, Linking } from "react-native";
import MapView from "react-native-maps";

export const CAMERA_CONFIG = {
  zoom: 17,
  pitch: 0,
  heading: 0,
  altitude: 1500,
};

export async function checkUsableLocation() {
  const servicesEnabled = await Location.hasServicesEnabledAsync();
  const { status } = await Location.getForegroundPermissionsAsync();
  return servicesEnabled && status === "granted";
}

export async function requestLocationPermission() {
  return Location.requestForegroundPermissionsAsync();
}

export async function getBestCurrentPosition() {
  return (
    (await Location.getLastKnownPositionAsync()) ??
    (await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    }))
  );
}

export function animateToPosition(
  mapRef: React.RefObject<MapView | null>,
  latitude: number,
  longitude: number,
  duration = 1200,
) {
  mapRef.current?.animateCamera(
    {
      center: { latitude, longitude },
      ...CAMERA_CONFIG,
    },
    { duration },
  );
}

export async function centerMapToUser(
  mapRef: React.RefObject<MapView | null>,
  duration = 1200,
) {
  const position = await getBestCurrentPosition();
  if (!position) return false;

  animateToPosition(
    mapRef,
    position.coords.latitude,
    position.coords.longitude,
    duration,
  );
  return true;
}

export async function handleDeniedPermission(canAskAgain: boolean) {
  if (!canAskAgain) {
    Alert.alert(
      "Permission blocked",
      "Location permission is blocked. Please enable it in Settings.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Open Settings", onPress: () => Linking.openSettings() },
      ],
    );
  }
}
