import { setOnboarded } from "@/features/onboarding/slices/onboarded";
import { useAppDispatch } from "@/store/hooks/hooks";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  BackHandler,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/ui/button";

const intros = [
  {
    title: "Get trips in",
    titleEnd: "seconds",
    description: "More requests, clear fares, zero stress",
    icon: require("../../assets/images/clock.png"),
    image: require("../../assets/images/intro1.png"),
  },
  {
    title: "Earn",
    titleEnd: "your way",
    description:
      "Earn more with better commissions, transparent pricing, no hassle.",
    icon: require("../../assets/images/coin.png"),
    image: require("../../assets/images/intro2.png"),
  },
  {
    title: "Ride more, save",
    titleEnd: "more!",
    description: "Earn rewards and automatic savings every time you drive.",
    icon: require("../../assets/images/percent.png"),
    image: require("../../assets/images/intro3.png"),
  },
];

//style for text shadow
const styles = StyleSheet.create({
  textShadow: {
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowOffset: { width: -1, height: 2.5 },
    textShadowRadius: 6,
  },
});

const Onboarding = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [currentIntro, setCurrentIntro] = useState(0);

  // Store onboarding completion
  const completeOnboarding = async () => {
    dispatch(setOnboarded(true));
    router.replace("/(auth)/signup");
  };

  const handleContinue = () => {
    if (currentIntro === intros.length - 1) {
      completeOnboarding();
    } else {
      setCurrentIntro((prev) => prev + 1);
    }
  };

  //back handler logic
  useEffect(() => {
    const back = () => {
      if (currentIntro > 0) {
        setCurrentIntro((prev) => prev - 1);
        return true;
      }
      return false;
    };
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      back,
    );
    return () => subscription.remove();
  });

  return (
    <SafeAreaView className="p-4 items-center justify-center">
      <View className="w-full flex-row items-center justify-between mb-4">
        <View />
        {/* Progress component */}
        <View className="flex-row items-center justify-center  py-5">
          {intros.map((_, index) => (
            <View
              key={index}
              className={`w-4 h-4 rounded-full mx-2 ${
                index <= currentIntro ? "bg-secondary" : "bg-progress"
              }`}
            />
          ))}
        </View>
        {/* skip btn */}
        <TouchableOpacity onPress={() => setCurrentIntro(intros.length - 1)}>
          <Text className="text-primary font-Poppins text-lg font-bold">
            Skip
          </Text>
        </TouchableOpacity>
      </View>

      {/* Intro content */}
      <View>
        <View className="w-25 h-25 -mb-9">
          <Image source={intros[currentIntro].image} className="" />
        </View>

        <View className="pb-8 px-12">
          <View className="items-center justify-center flex-row">
            <Text
              className="text-center text-[28px] font-SerifItalic"
              style={styles.textShadow}
            >
              {intros[currentIntro].title}
            </Text>

            <Image
              source={intros[currentIntro].icon}
              className="w-10 h-10 mx-1"
            />

            <Text
              className="text-[28px] font-SerifItalic text-shadow-lg"
              style={styles.textShadow}
            >
              {intros[currentIntro].titleEnd}
            </Text>
          </View>

          <Text className="text-center text-xl text-lightGray mt-2 font-Sans">
            {intros[currentIntro].description}
          </Text>
        </View>
      </View>
      <Button width="60%" onPress={handleContinue} />
    </SafeAreaView>
  );
};

export default Onboarding;
