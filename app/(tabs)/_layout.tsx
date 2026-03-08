import { CustomTabBar } from "@/components/ui/tabBar/customTabBar";
import { useAppSelector } from "@/store/hooks/hooks";
import { Redirect, Tabs } from "expo-router";

const TabsLayout = () => {
  const { user } = useAppSelector((s) => s.auth);

  if (!user) return <Redirect href="/(auth)" />;

  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="rides" options={{ title: "Rides" }} />
      <Tabs.Screen name="wallet" options={{ title: "Wallet" }} />
    </Tabs>
  );
};

export default TabsLayout;
