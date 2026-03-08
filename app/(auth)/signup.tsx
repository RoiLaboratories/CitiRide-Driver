import { sendOtp } from "@/features/auth/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import {
  AsYouType,
  CountryCode,
  parsePhoneNumberFromString,
} from "libphonenumber-js";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/ui/button";
import NumericKeypad from "../../features/auth/components/keypad";
import NumberEntry from "../../features/auth/components/numberEntry";

type OtpMethod = "whatsapp" | "sms";

const Signup = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const [countryCode, setCountryCode] = useState<CountryCode>("NG");
  const [callingCode, setCallingCode] = useState("234");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpMethod, setOtpMethod] = useState<OtpMethod>("whatsapp");

  const subtitle =
    otpMethod === "whatsapp" ? "on your WhatsApp" : "via an SMS message";
  const isActive = phoneNumber.length > 0;

  const validatePhoneNumber = () => {
    const phoneNumObj = parsePhoneNumberFromString(phoneNumber, countryCode);
    const e164 = phoneNumObj?.format("E.164");

    if (!phoneNumObj) return false;
    return phoneNumObj.isValid();
  };

  const isValid = validatePhoneNumber();
  const isError = phoneNumber.length > 0 && !isValid;
  const isDisabled = !isValid;

  const handleSelectCountry = (code: string, calling: string) => {
    setCountryCode(code as CountryCode);
    setCallingCode(calling);
    setPhoneNumber("");
  };

  // format the number as user inputs/deletes
  const formatPhoneNum = (value: string) => {
    const formatter = new AsYouType(countryCode);
    return formatter.input(value);
  };

  const handleNumberPress = (digit: string) => {
    const digitsOnly = phoneNumber.replace(/\D/g, "");
    if (digitsOnly.length >= 15) return;
    const rawNumber = phoneNumber + digit;

    setPhoneNumber(formatPhoneNum(rawNumber));
  };

  const handleDelete = () => {
    const rawNum = phoneNumber.slice(0, -1);
    setPhoneNumber(formatPhoneNum(rawNum));
  };

  const handleClear = () => {
    setPhoneNumber("");
  };

  const handleOtpToggle = () => {
    setOtpMethod((prev) => (prev === "whatsapp" ? "sms" : "whatsapp"));
  };

  const phoneNumObj = parsePhoneNumberFromString(phoneNumber, countryCode);
  const e164 = phoneNumObj?.format("E.164");

  const onContinue = async () => {
    console.log("Phone Number:", `${e164}`);
    if (!e164) return;
    try {
      const result = await dispatch(sendOtp(e164)).unwrap();

      router.push({
        pathname: "/verify",
        params: {
          phone: e164,
          method: otpMethod,
        },
      });
    } catch (err) {
      console.log("Failed to send OTP");
    }
  };

  return (
    <SafeAreaView className="p-4 bg-white flex-1">
      <View className="flex-row items-center justify-between pt-2">
        <Pressable
          onPress={() => {
            router.back();
          }}
        >
          <Feather name="arrow-left" size={28} color="black" />
        </Pressable>
        <Text className="font-PoppinsSemi text-[23px]">Enter your number</Text>
        <View />
      </View>
      <Text className="font-Poppins px-10 text-center text-lightGray text-base mt-1">
        We’ll send you a verification code {subtitle}
      </Text>

      <View className="flex-1 justify-between pb-8">
        {/* phone number input */}
        <NumberEntry
          countryCode={countryCode}
          callingCode={callingCode}
          phone={phoneNumber}
          onSelectCountry={handleSelectCountry}
          onToggleOtpMethod={handleOtpToggle}
          otpMethod={otpMethod}
          onClearPhone={handleClear}
          isActive={isActive}
          isError={isError}
        />

        {/* numeric keypad */}
        <NumericKeypad
          onNumberPress={handleNumberPress}
          onDelete={handleDelete}
        />

        <Button
          onPress={() => onContinue()}
          disabled={isDisabled}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );
};

export default Signup;
