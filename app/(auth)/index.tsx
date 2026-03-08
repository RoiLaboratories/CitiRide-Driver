import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/ui/button";

const Index = () => {
  return (
    <SafeAreaView className="p-4 flex-1">
      <View className="flex-1 justify-between ">
        <View>
          <Text className="text-4xl font-PoppinsBold">Welcome</Text>
          <Text className="text-lg font-Poppins text-gray-500 mt-2">
            Sign up or Log in to continue
          </Text>
        </View>
        <View>
          <Image source={require("../../assets/images/authIndex.png")} />
        </View>

        {/* btns */}
        <View className="mb-4">
          <Button title="Sign up" route="/(auth)/signup" />
          <Button
            title="Log in"
            onPress={() => console.log("login clicked")}
            backgroundColor="transparent"
            borderColor="#CF08E9"
            border="1"
            color="#CF08E9"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Index;
