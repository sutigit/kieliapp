import CourseProgress from "@/app/courses/components/course-header";
import { CourseLog, UserLog } from "@/app/lib/types";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import CourseContent from "../components/course-content";

import content from "@/app/courses/blueprints/pilkku.json";

const userLog: UserLog = {
  userId: "user-1",
  courses: {
    "course-1": {
      courseId: "course-1",
      title: "Lauseet",
      progress: 0,
      completed: false,
      exercises: {},
    },
    "course-2": {
      courseId: "course-2",
      title: "Pilkku",
      progress: 0,
      completed: false,
      exercises: {},
    },
  },
};

export default function Course() {
  const { id } = useLocalSearchParams();
  const [progress, setProgress] = useState(1);
  const courseId = id as string;
  const [courseLog, setCourseLog] = useState<CourseLog | null>(
    userLog.courses[courseId] || null
  );

  console.log("Course Log:", courseLog);

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
