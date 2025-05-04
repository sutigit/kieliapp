import { View } from "react-native";
import Icons from "@expo/vector-icons/Ionicons";

const Image = ({ image }: { image: string }) => (
  <View
    style={{
      backgroundColor: "#ffe4e6",
      height: 160,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Icons name="image" size={90} color="white" />
  </View>
);

export default Image;
