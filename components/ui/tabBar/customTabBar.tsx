import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useLinkBuilder } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { TabBarItem } from "./tabBarItem";

const HORIZONTAL_PADDING = 4;
const PILL_GAP = 2;

export function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { buildHref } = useLinkBuilder();
  const [barWidth, setBarWidth] = useState(0);

  const activeIndex = useSharedValue(state.index);
  const travelBoost = useSharedValue(0);

  useEffect(() => {
    activeIndex.value = withSpring(state.index, {
      damping: 16,
      stiffness: 180,
      mass: 0.7,
    });

    // quick stretch "juice" while moving
    travelBoost.value = 0;
    travelBoost.value = withSequence(
      withTiming(1, { duration: 120, easing: Easing.out(Easing.cubic) }),
      withTiming(0, { duration: 180, easing: Easing.out(Easing.cubic) }),
    );
  }, [state.index, activeIndex, travelBoost]);

  const onLayout = (e: LayoutChangeEvent) => {
    setBarWidth(e.nativeEvent.layout.width);
  };

  const routeCount = state.routes.length || 1;
  const innerWidth = Math.max(0, barWidth - HORIZONTAL_PADDING * 2);
  const slotWidth = innerWidth / routeCount;
  const pillWidth = Math.max(0, slotWidth - PILL_GAP * 2);

  const pillStyle = useAnimatedStyle(() => {
    const x = activeIndex.value * slotWidth + PILL_GAP;
    const stretch = 1 + travelBoost.value * 0.14;

    return {
      transform: [{ translateX: x }, { scaleX: stretch }],
    };
  }, [slotWidth]);

  const glowStyle = useAnimatedStyle(() => {
    const x = activeIndex.value * slotWidth + PILL_GAP;
    return {
      opacity: withTiming(0.22 + travelBoost.value * 0.18, { duration: 120 }),
      transform: [{ translateX: x }, { scaleX: 1 + travelBoost.value * 0.2 }],
    };
  }, [slotWidth]);

  return (
    <View
      onLayout={onLayout}
      className="flex-row bg-black w-[70%] justify-between self-center absolute bottom-[45px] rounded-[35px] px-2 py-2 overflow-hidden"
    >
      {barWidth > 0 && (
        <>
          <Animated.View
            pointerEvents="none"
            style={[
              {
                position: "absolute",
                left: HORIZONTAL_PADDING,
                top: 8,
                bottom: 8,
                width: pillWidth,
                borderRadius: 35,
                backgroundColor: "#CF08E9",
              },
              pillStyle,
            ]}
          />
          <Animated.View
            pointerEvents="none"
            style={[
              {
                position: "absolute",
                left: HORIZONTAL_PADDING,
                top: 5,
                bottom: 5,
                width: pillWidth,
                borderRadius: 35,
              },
              glowStyle,
            ]}
          />
        </>
      )}

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({ type: "tabLongPress", target: route.key });
        };

        return (
          <TabBarItem
            key={route.key}
            routeName={route.name}
            label={String(label)}
            isFocused={isFocused}
            href={buildHref(route.name, route.params)}
            onPress={onPress}
            onLongPress={onLongPress}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
          />
        );
      })}
    </View>
  );
}
