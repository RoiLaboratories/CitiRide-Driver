// import Header from "@/features/home/components/header";
// import Map from "@/features/home/components/map";
// import { SafeAreaView } from "react-native-safe-area-context";

// const HomeIndex = () => {
//   return (
//     <SafeAreaView className="flex-1">
//       <Header />
//       <Map />
//     </SafeAreaView>
//   );
// };

// export default HomeIndex;

import Header from "@/features/home/components/header";
import Map from "@/features/home/components/map";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeIndex = () => {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1">
        <Map />
        <View
          className="absolute top-0 left-0 right-0 z-50"
          style={{ elevation: 10 }}
        >
          <Header />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeIndex;
