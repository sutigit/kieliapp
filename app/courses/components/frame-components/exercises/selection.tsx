import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import type { Exercise } from "@/app/lib/types";

const SelectionEx = ({
  exercise,
  action,
}: {
  exercise: Exercise;
  action: () => void;
}) => {
  const [selected, setSelected] = useState<number | null>(null);

  const getStyle = (index: number) => {
    if (selected === null) {
      return {
        backgroundColor: "#fff7ed", // orange 50
        opacity: 1,
      };
    } else {
      if (selected === index) {
        return {
          backgroundColor: "#93c5fd", // blue 300
          opacity: 1,
        };
      } else {
        return {
          backgroundColor: "white",
          opacity: 0.5,
        };
      }
    }
  };

  return (
    <View style={{ marginTop: 10 }}>
      {exercise.options?.map((option, index) => (
        <Pressable
          onPress={() => {
            setSelected(index);
          }}
          key={index}
          style={{
            ...getStyle(index),
            borderColor: "#292524", // stone 800
            borderBottomWidth: 4,
            borderWidth: 1,
            paddingHorizontal: 18,
            paddingVertical: 12,
            borderRadius: 10,
            marginTop: 15,
          }}
        >
          <Text
            style={{ fontSize: 16, fontWeight: "medium", color: "#0c0a09" }}
          >
            {option}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default SelectionEx;
