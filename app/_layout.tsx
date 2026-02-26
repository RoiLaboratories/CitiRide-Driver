import { loadOnboardingState } from "@/features/onboarding/slices/onboarded";
import { useAppDispatch } from "@/store/hooks/hooks";
import { store } from "@/store/store";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { View } from "react-native";
import "react-native-reanimated";
import { Provider } from "react-redux";
import "../global.css";

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

function LayoutWithHydration() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadOnboardingState());
  }, [dispatch]);

  return <RootLayoutNav />;
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsSemi: require("../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
    InstrumentSerif: require("../assets/fonts/InstrumentSerif-Regular.ttf"),
    InstrumentSerifItalic: require("../assets/fonts/InstrumentSerif-Italic.ttf"),
    InstrumentSans: require("../assets/fonts/InstrumentSans-Regular.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <Provider store={store}>
      <LayoutWithHydration />
    </Provider>
  );
}

const RootLayoutNav = () => {
  return (
    <View className="bg-background flex-1">
      <StatusBar style="auto" />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(registration)" />
        <Stack.Screen name="(auth)" />
      </Stack>
    </View>
  );
};
