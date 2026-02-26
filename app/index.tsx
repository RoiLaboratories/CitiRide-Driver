import { useAppSelector } from "@/store/hooks/hooks";
import { Redirect } from "expo-router";
import { View } from "react-native";

export default function Index() {
  const { onboarded, hydrated } = useAppSelector(
    (state) => state.userOnboarded,
  );

  if (!hydrated) {
    return <View />;
  }

  if (!onboarded) {
    return <Redirect href="/(onboarding)" />;
  }

  return <Redirect href="/(auth)" />;
}
