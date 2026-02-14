import { Href, useRouter } from "expo-router";
import { DimensionValue, Text, TouchableOpacity } from "react-native";

type ButtonProps = {
  title?: string;
  onPress?: () => void;
  route?: Href;
  width?: DimensionValue;
};

const Button = ({
  title,
  onPress,
  route,
  width = "100%" as DimensionValue,
}: ButtonProps) => {
  const router = useRouter();

  const handlePress = () => {
    if (route) {
      router.push(route);
    }
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      className="items-center justify-center bg-primary py-4 rounded-[35px]"
      onPress={handlePress}
      style={{ width }}
    >
      <Text className="text-white font-Poppins text-lg">{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
