import { Entypo, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CountryPicker, { Country } from "react-native-country-picker-modal";

type OtpMethod = "whatsapp" | "sms";

type Props = {
  countryCode: string;
  callingCode: string;
  phone: string;
  otpMethod: OtpMethod;
  onSelectCountry: (countryCode: string, callingCode: string) => void;
  onClearPhone: () => void;
  onToggleOtpMethod: () => void;
  isActive?: boolean;
  isError?: boolean;
};

const NumberEntry = ({
  countryCode,
  callingCode,
  phone,
  otpMethod,
  onSelectCountry,
  onClearPhone,
  onToggleOtpMethod,
  isActive,
  isError,
}: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const handleSelect = (country: Country) => {
    onSelectCountry(country.cca2, country.callingCode[0]);
    setOpenModal(false);
  };

  const toggleText = otpMethod === "whatsapp" ? "text message" : "WhatsApp";

  return (
    <View className="px-2 pt-6">
      <View className="flex-row items-start justify-between">
        {/* Country Picker */}
        <View className="flex-row items-center justify-center bg-lightBg rounded-[28px] p-4">
          <CountryPicker
            visible={openModal}
            countryCode={countryCode as any}
            onSelect={handleSelect}
            withFlag
            withFlagButton
            withCallingCode
            withFilter
            onClose={() => setOpenModal(false)}
          />
          <Pressable className="-ml-3" onPress={() => setOpenModal(true)}>
            <Entypo
              name="chevron-small-down"
              size={25}
              style={{ color: "#ADADAD" }}
            />
          </Pressable>
        </View>

        {/* Phone Input Display */}
        <View className="flex-[0.95]">
          <View
            className=" rounded-[28px] py-[5px] px-3 flex-row items-center justify-between"
            style={{
              borderWidth: 2,
              backgroundColor: isActive ? "transparent" : "#E6E6E6",
              borderColor: isError
                ? "#FF3838"
                : isActive
                  ? "#CF08E9"
                  : "transparent",
              boxShadow: isError
                ? "0px 0px 6px rgba(255, 56, 56, 0.5)"
                : isActive
                  ? "0px 0px 6px rgba(207, 8, 233, 0.5)"
                  : "none",
            }}
          >
            <TextInput
              placeholder="123 4567 890"
              placeholderTextColor="#ADADAD"
              editable={false}
              className="px-3 text-lg font-Poppins"
              value={phone}
            />
            {phone.length > 0 && (
              <TouchableOpacity onPress={() => onClearPhone()}>
                <MaterialIcons name="cancel" size={24} color="black" />
              </TouchableOpacity>
            )}
          </View>
          {/* Error Message */}
          {isError && (
            <Text className="mt-1 text-base ml-2 text-error font-Poppins">
              Invalid number format
            </Text>
          )}
        </View>
      </View>

      {/* OTP Method Toggle */}
      <Pressable onPress={onToggleOtpMethod}>
        <Text className="mt-4 text-[14px] text-primary font-Poppins">
          Send via {toggleText} instead
        </Text>
      </Pressable>

      {/* <Text className="mt-2 text-base font-Poppins">
        +{callingCode}
        {phone}
      </Text> */}
    </View>
  );
};

export default NumberEntry;
