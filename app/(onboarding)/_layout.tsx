import { Stack } from "expo-router";

const OnboardingLayout = () => {
  return (
    <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      {/* <Stack.Screen name="userTypeSelection" /> */}
    </Stack>
  );
};

export default OnboardingLayout;
