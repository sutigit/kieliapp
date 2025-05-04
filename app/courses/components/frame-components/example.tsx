import { View, Text } from "react-native";

const Example = ({ text }: { text: string[] }) => (
  <View
    style={{
      backgroundColor: "#e0f2fe",
      borderColor: "#7dd3fc",
      paddingHorizontal: 10,
      paddingVertical: 15,
      borderRadius: 5,
      marginTop: 20,
      borderWidth: 1,
    }}
  >
    {text.map((line, index) => (
      <Text
        key={index}
        style={{ fontSize: 16, lineHeight: 24, margin: 10, color: "#0c0a09" }}
      >
        {line}
      </Text>
    ))}
  </View>
);

export default Example;
