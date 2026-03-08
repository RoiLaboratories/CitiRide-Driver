import { PlatformPressable, Text } from "@react-navigation/elements";
import { useEffect } from "react";
import { Image } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export const TAB_ICONS = {
  home: {
    active: require("../../../assets/images/active-home.png"),
    inactive: require("../../../assets/images/inactive-home.png"),
  },
  rides: {
    active: require("../../../assets/images/active-ride.png"),
    inactive: require("../../../assets/images/inactive-ride.png"),
  },
  wallet: {
    active: require("../../../assets/images/inactive-wallet.png"),
    inactive: require("../../../assets/images/inactive-wallet.png"),
  },
} as const;

type TabKey = keyof typeof TAB_ICONS;

type TabBarItemProps = {
  routeName: string;
  label: string;
  isFocused: boolean;
  href?: string;
  onPress: () => void;
  onLongPress: () => void;
  accessibilityLabel?: string;
  testID?: string;
};

export function TabBarItem({
  routeName,
  label,
  isFocused,
  href,
  onPress,
  onLongPress,
  accessibilityLabel,
  testID,
}: TabBarItemProps) {
  const labelOpacity = useSharedValue(isFocused ? 1 : 0);

  useEffect(() => {
    labelOpacity.value = withTiming(isFocused ? 1 : 0, { duration: 180 });
  }, [isFocused, labelOpacity]);

  const labelStyle = useAnimatedStyle(() => ({
    opacity: labelOpacity.value,
  }));

  const key = routeName.toLowerCase() as TabKey;
  const iconSource = TAB_ICONS[key]?.[isFocused ? "active" : "inactive"];

  return (
    <PlatformPressable
      href={href}
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      onPress={onPress}
      onLongPress={onLongPress}
      className="flex-1 items-center flex-row justify-center gap-2 py-3 rounded-[35px]"
    >
      {iconSource && (
        <Image
          source={iconSource}
          style={{ width: 24, height: 24 }}
          resizeMode="contain"
        />
      )}

      {isFocused && (
        <Animated.View style={labelStyle}>
          <Text
            style={{
              color: "#fff",
              fontSize: 14,
              fontFamily: "Poppins-Regular",
            }}
          >
            {label}
          </Text>
        </Animated.View>
      )}
    </PlatformPressable>
  );
}
