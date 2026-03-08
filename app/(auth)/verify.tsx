import Button from "@/components/ui/button";
import NumericKeypad from "@/features/auth/components/keypad";
import OtpInput from "@/features/auth/components/pinInput";
import { verifyOtp } from "@/features/auth/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import parsePhoneNumberFromString from "libphonenumber-js";
import { useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Verify = () => {
  const dispatch = useAppDispatch();
  const { verificationId, loading, error } = useAppSelector(
    (state) => state.auth,
  );
  const router = useRouter();
  const [code, setCode] = useState("");
  const MAX_CODE_LENGTH = 4;
  const pinReady = code.length === MAX_CODE_LENGTH;
  // const localInvalid = pinReady && code !== "2355";
  // const isError = !!error || localInvalid;
  const isError = !!error;

  const isDisabled = code.length < MAX_CODE_LENGTH;

  const { phone, method } = useLocalSearchParams<{
    phone: string;
    method: "whatsapp" | "sms";
  }>();

  const formatE164 = (e164: string) => {
    const parsed = parsePhoneNumberFromString(e164);
    if (!parsed) return e164;
    return parsed.formatInternational();
  };
  const formattedPhone = formatE164(phone);

  const [otpMethod, setOtpMethod] = useState<"whatsapp" | "sms">(
    method === "sms" ? "sms" : "whatsapp",
  );
  const subtitle =
    otpMethod === "whatsapp" ? "to your WhatsApp" : "via a text message";

  const toggleLabel = otpMethod === "whatsapp" ? "text message" : "WhatsApp";

  const handleNumPress = (digit: string) => {
    const codeDigits = code + digit;
    if (code.length >= MAX_CODE_LENGTH) return;
    setCode(codeDigits);
  };

  const handleDelete = () => {
    const codeDigits = code.slice(0, -1);
    setCode(codeDigits);
  };

  // const handleContinue = async () => {
  //   if (!verificationId) return;

  //   try {
  //     await dispatch(verifyOtp({ verificationId, code })).unwrap();
  //     router.replace("/(tabs)/home");
  //   } catch (err: any) {
  //     // show toast/snackbar with err.message
  //   }
  // };
  const handleContinue = async () => {
    if (!verificationId || code.length < MAX_CODE_LENGTH) return;

    try {
      await dispatch(verifyOtp({ verificationId, code })).unwrap();
      router.replace("/(tabs)/home");
    } catch {
      // show toast/snackbar with err.message
    }
  };

  const handleOtpToggle = () => {
    setOtpMethod((prev) => (prev === "whatsapp" ? "sms" : "whatsapp"));
  };

  const countdown = () => {};

  return (
    <SafeAreaView className="p-4 bg-white flex-1">
      <View>
        <View className="flex-row items-center justify-between">
          <Pressable
            onPress={() => {
              router.back();
            }}
          >
            <Feather name="arrow-left" size={28} color="black" />
          </Pressable>
          <Text className="font-PoppinsSemi text-[23px]">Enter the code</Text>
          <View />
        </View>
        <View className="items-center">
          <Text className="font-Poppins text-lightGray text-[14px] px-3 text-center">
            A verification code was sent {subtitle}
          </Text>
          <Text className="font-PoppinsSemi text-[14px]">{formattedPhone}</Text>
        </View>
      </View>

      {/* OTP input and keypad */}
      <View className="pt-10">
        <OtpInput
          code={code}
          maxLength={MAX_CODE_LENGTH}
          onToggleOtpMethod={handleOtpToggle}
          onCountdown={countdown}
          isError={isError}
        />
        {isError && (
          <Text className="font-Poppins text-lg pt-3 pl-5 text-error">
            Incorrect Code
          </Text>
        )}

        <View className="flex-row items-center justify-between px-4 pt-3 pb-12">
          <TouchableOpacity>
            <Text className="font-Poppins text-lg">Resend code</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOtpToggle}>
            <Text className="font-Poppins text-lg text-primary">
              Send via {toggleLabel}
            </Text>
          </TouchableOpacity>
        </View>
        <NumericKeypad onNumberPress={handleNumPress} onDelete={handleDelete} />
      </View>

      <View className="pt-10">
        <Button
          onPress={handleContinue}
          disabled={isDisabled}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );
};

export default Verify;
