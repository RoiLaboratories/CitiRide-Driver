import { Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

function Index() {
  return <Redirect href={"/(onboarding)"} />;
}

export default function RootIndex() {
  return (
    <SafeAreaView>
      <Index />
    </SafeAreaView>
  );
}
