import CourseProgress from "@/app/courses/components/course-header";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import CourseContent from "../components/course-content";

import content from "@/app/courses/blueprints/pilkku.json";

export default function Course() {
  const { id } = useLocalSearchParams();
  const [progress, setProgress] = useState(1);

  return (
    <View style={styles.container}>
      <CourseProgress content={content} progress={progress} />
      <CourseContent
        content={content}
        progress={progress}
        setProgress={setProgress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
  },
});
