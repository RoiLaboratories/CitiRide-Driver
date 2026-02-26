import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

type Props = {
  onNumberPress: (digit: string) => void;
  onDelete: () => void;
};

const NumericKeypad = ({ onNumberPress, onDelete }: Props) => {
  const numbers = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["", "0", "delete"],
  ];

  return (
    <View className="mt-7 px-6">
      {numbers.map((row, rowIndex) => (
        <View key={rowIndex} className="flex-row justify-between mb-6">
          {row.map((item, index) => {
            if (item === "") {
              return <View key={index} className="w-[75px]" />;
            }

            if (item === "delete") {
              return (
                <Pressable
                  key={index}
                  className="w-[75px] h-[75px] items-center justify-center border border-lightGray rounded-full"
                  onPress={onDelete}
                >
                  {({ pressed }) => (
                    <View
                      className={`w-full h-full items-center justify-center rounded-full ${
                        pressed ? "bg-gray-200" : "bg-white"
                      }`}
                    >
                      <MaterialIcons
                        name="backspace"
                        size={28}
                        style={{ color: "#8B8B8B" }}
                      />
                    </View>
                  )}
                </Pressable>
              );
            }

            return (
              <Pressable
                key={index}
                onPress={() => onNumberPress(item)}
                className="w-[75px] h-[75px] items-center justify-center rounded-full border border-lightGray"
              >
                {({ pressed }) => (
                  <View
                    className={`w-full h-full items-center justify-center rounded-full ${
                      pressed ? "bg-gray-200" : "bg-white"
                    }`}
                  >
                    <Text className="text-4xl font-Poppins text-keypadText">
                      {item}
                    </Text>
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
};

export default NumericKeypad;
