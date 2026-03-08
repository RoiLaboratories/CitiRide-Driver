import { Entypo } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const styles = StyleSheet.create({
  boxShadow: {
    boxShadow: "0px 2px 4px 1px rgba(0, 0, 0, 0.19)",
  },
});

const Header = () => {
  return (
    <View className="mb-10 px-3 pt-4 flex-row items-center">
      <TouchableOpacity
        className="w-[55px] h-[55px] rounded-full"
        style={styles.boxShadow}
      >
        <Image
          source={require("../../../assets/images/placeholderDp.png")}
          className="w-[55px] h-[55px] rounded-full"
        />
      </TouchableOpacity>
      {/* Income overview */}
      <View
        className="flex-row items-center bg-white py-[4px] px-3 gap-3 rounded-[35px]"
        style={styles.boxShadow}
      >
        <Image
          source={require("../../../assets/images/moneyBag.png")}
          className="w-[28px] h-[28px] -mt-1"
        />
        <View className="gap-[2px]">
          <Text className="font-Poppins text-keypadText text-base">
            Your activity
          </Text>
          <Text className="font-PoppinsSemi text-2xl">₦2,000</Text>
        </View>
        <TouchableOpacity>
          <Entypo name="chevron-thin-right" size={20} color="#8B8B8B" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
