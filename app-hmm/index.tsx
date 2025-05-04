import { Text, View } from "react-native";

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Link style={{ fontSize: 20, color: "blue" }} href="/courses">
        Kurssit
      </Link> */}
      <Text style={{ fontSize: 20, color: "blue" }}>Moi</Text>
    </View>
  );
}
