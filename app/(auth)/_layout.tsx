import { useAppSelector } from "@/store/hooks/hooks";
import { Redirect, Stack } from "expo-router";

const AuthLayout = () => {
  const { user } = useAppSelector((s) => s.auth);

  if (user) return <Redirect href="/(tabs)/home" />;

  return (
    <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="verify" />
    </Stack>
  );
};

export default AuthLayout;
