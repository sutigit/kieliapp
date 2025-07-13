import { Link } from "expo-router";
import { View } from "react-native";

export default function Courses() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link
        href={{
          pathname: "/course-page/[id]",
          params: { id: "course-1" },
        }}
        style={{ fontSize: 20, color: "blue" }}
      >
        Pilkku
      </Link>
    </View>
  );
}
