import { Stack } from "expo-router";

const RidesLayout = () => {
  return (
    <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default RidesLayout;
