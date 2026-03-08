import { Href, useRouter } from "expo-router";
import {
  ActivityIndicator,
  DimensionValue,
  Text,
  TouchableOpacity,
} from "react-native";

type ButtonProps = {
  title?: string;
  onPress?: () => void;
  route?: Href;
  width?: DimensionValue;
  backgroundColor?: string;
  borderColor?: string;
  border?: string;
  color?: string;
  className?: string;
  disabled?: boolean;
  opacity?: number;
  loading?: boolean;
};

const Button = ({
  title = "Continue",
  onPress,
  route,
  width = "100%" as DimensionValue,
  backgroundColor = "#CF08E9",
  borderColor = "#CF08E9",
  border = "none",
  color = "#fff",
  className,
  disabled = false,
  opacity = disabled ? 0.5 : 1,
  loading = false,
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
      className={`items-center justify-center py-4 rounded-[35px] mb-4 ${className}`}
      onPress={handlePress}
      style={{
        width,
        backgroundColor,
        borderColor,
        borderWidth: border === "none" ? 0 : 1,
        opacity,
      }}
      disabled={disabled}
    >
      {loading ? (
        <ActivityIndicator color={"#fff"} size={30} />
      ) : (
        <Text
          className={`font-Poppins text-xl ${className}`}
          style={{
            color,
          }}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
