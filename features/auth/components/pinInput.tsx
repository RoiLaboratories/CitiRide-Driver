import { useRouter } from "expo-router";
import { Text, View } from "react-native";

// type OtpMethod = "whatsapp" | "sms";

type Props = {
  code: string;
  maxLength: number;
  // pinReady: boolean;
  isError?: boolean;
  // otpMethod: OtpMethod;
  onToggleOtpMethod: () => void;
  onCountdown: () => void;
};

const PinInput = ({
  code,
  maxLength,
  // pinReady,

  isError,
  // otpMethod,
  onToggleOtpMethod,
  onCountdown,
}: Props) => {
  const router = useRouter();
  const codeDigitArray = new Array(maxLength).fill(0);

  const codeInput = (_value: number, index: number) => {
    const digit = code[index] || " ";
    // const isCurrent = index === code.length;
    const isFilled = index < code.length;
    return (
      <View
        key={index}
        className="bg-lightBg flex-[0.25] rounded-[35px] py-5 mx-[6px]"
        style={{
          borderWidth: 2,
          backgroundColor: isFilled ? "transparent" : "#E6E6E6",
          borderColor: isError
            ? "#FF3838"
            : isFilled
              ? "#CF08E9"
              : "transparent",
          boxShadow: isError
            ? "0px 0px 6px rgba(255, 56, 56, 0.5)"
            : isFilled
              ? "0px 0px 6px rgba(207, 8, 233, 0.5)"
              : "none",
        }}
      >
        <Text className="text-center font-Poppins text-4xl">{digit}</Text>
      </View>
    );
  };
  return (
    <View className="">
      <View className="flex-row items-center justify-between ">
        {codeDigitArray.map(codeInput)}
      </View>
    </View>
  );
};

export default PinInput;
