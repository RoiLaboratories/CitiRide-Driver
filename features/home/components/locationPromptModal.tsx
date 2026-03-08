import Button from "@/components/ui/button";
import { BlurView } from "expo-blur";
import { Modal, Platform, Text, View } from "react-native";

interface LocationPromptModalProps {
  visible: boolean;
  onSetLocation: () => void;
  onLater: () => void;
}

const LocationPromptModal = ({
  visible,
  onSetLocation,
  onLater,
}: LocationPromptModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      {Platform.OS === "ios" ? (
        <BlurView intensity={24} tint="light" className="absolute inset-0" />
      ) : (
        <View className="absolute inset-0 bg-primary/25" />
      )}
      {Platform.OS === "ios" && (
        <View className="absolute inset-0 bg-primary/25" />
      )}

      <View className="flex-1 items-center justify-end mb-[45px] px-4">
        <View className="w-full rounded-3xl border border-white/30 bg-white py-5 px-3 items-center">
          <Text className="text-[20px] font-PoppinsSemi">
            Set your location?
          </Text>
          <Text className="mt-2 text-base text-keypadText font-Poppins text-center px-6">
            Set your location so we can find rides near you and pick you up at
            the right spot
          </Text>

          <View className="mt-5 w-full">
            <Button title="Set location" onPress={onSetLocation} />
            <Button
              title="Do it later"
              onPress={onLater}
              backgroundColor="#E6E6E6"
              color="#000"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LocationPromptModal;
