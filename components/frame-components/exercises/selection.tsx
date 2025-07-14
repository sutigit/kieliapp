import type { SelectionTypeExercise } from "@/lib/types";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

const Selection = ({
  content,
}: {
  content: SelectionTypeExercise;
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

  useEffect(() => {
    if (selected === null) return;

    console.log("📌 selected", selected)
  }, [selected]);

  return (
    <View style={{ marginTop: 10 }}>
      {content.options?.map((option, index) => (
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

export default Selection;
