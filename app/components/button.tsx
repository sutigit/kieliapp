import { Pressable, Text } from "react-native";

export default function Button({
  title,
  onPress,
  disabled = false,
  color = "black",
  borderColor = "black",
  backgroundColor = "white",
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  color?: string;
  borderColor?: string;
  backgroundColor?: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        {
          backgroundColor: pressed || disabled ? "#d6d3d1" : backgroundColor,
          borderColor: disabled ? "#a8a29e" : borderColor,
          borderWidth: 1,
          borderBottomWidth: 4,
          padding: 10,
          borderRadius: 100,
          paddingHorizontal: 30,
        },
      ]}
    >
      <Text
        style={{
          color: color,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
}
