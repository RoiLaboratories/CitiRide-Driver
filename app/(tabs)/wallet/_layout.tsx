import { Stack } from "expo-router";

const WalletLayout = () => {
  return (
    <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default WalletLayout;
