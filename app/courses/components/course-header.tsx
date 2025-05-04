import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import Icons from "@expo/vector-icons/Ionicons";

export default function CourseHeader({
  content,
  progress,
}: {
  content: any;
  progress: number;
}) {
  const width = useSharedValue(0);

  useEffect(() => {
    const ratio = (progress / content.frames.length) * 100;
    width.value = withTiming(ratio);
  }, [progress]);

  const animatedWidth = useAnimatedStyle(() => {
    return {
      width: `${width.value}%`,
    };
  });

  return (
    <View style={styles.container}>
      <Icons name="close" size={32} />
      <View style={styles.progressBg}>
        <Animated.View style={[styles.progressInd, animatedWidth]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 15,
    paddingHorizontal: 30,
    paddingBottom: 15,
    paddingTop: 30,
    backgroundColor: "#fff",
    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
  },
  progressBg: {
    backgroundColor: "#e7e5e4",
    height: 15,
    flex: 1,
    borderRadius: 100,
    overflow: "hidden",
  },
  progressInd: {
    backgroundColor: "#84cc16",
    height: "100%",
  },
});
