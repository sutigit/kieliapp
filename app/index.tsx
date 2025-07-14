import { Link } from "expo-router";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link style={{ fontSize: 20, color: "blue" }} href="/courses">
        Kurssit
      </Link>
    </View>
  );
}
