//

import { useAppSelector } from "@/store/hooks/hooks";
import { Redirect } from "expo-router";
import { View } from "react-native";

export default function Index() {
  const { onboarded, hydrated } = useAppSelector((s) => s.userOnboarded);
  const { user } = useAppSelector((s) => s.auth);

  if (!hydrated) return <View />;

  if (!onboarded) return <Redirect href="/(onboarding)" />;
  if (user) return <Redirect href="/(tabs)/home" />;

  return <Redirect href="/(auth)" />;
}
