import { View, Text } from "react-native";

const TextBlock = ({ text }: { text: string[] }) => (
  <View>
    {text.map((line, index) => (
      <Text
        key={index}
        style={{
          fontSize: 16,
          lineHeight: 24,
          marginTop: 20,
          color: "#0c0a09",
        }}
      >
        {line}
      </Text>
    ))}
  </View>
);

export default TextBlock;
