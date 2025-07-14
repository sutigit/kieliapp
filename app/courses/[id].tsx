import CourseContentView from "@/components/course-content-view";
import ProgressBar from "@/components/progress-bar";
import {
  mockCourseContentRequest,
  mockCourseLogRequest,
} from "@/lib/mocks";
import { ControlState, CourseContent, CourseLog } from "@/lib/types";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Course() {
  const { id } = useLocalSearchParams();
  const courseId = id as string;

  // should be state managed
  const [progress, setProgress] = useState<number>(1);
  const [controlState, setControlState] = useState<ControlState>("static"); // should be state managed

  const [loading, setLoading] = useState<boolean>(true);

  const [courseContent, setCourseContent] = useState<CourseContent | null>(null);
  const [courseLog, setCourseLog] = useState<CourseLog | null>(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      setLoading(true);
      try {
        const [courseContent, courseLog] = await Promise.all([
          mockCourseContentRequest(courseId),
          mockCourseLogRequest("user-1", courseId),
        ]);
        setCourseContent(courseContent as CourseContent);
        setCourseLog(courseLog as CourseLog);
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId]);

  if (loading || !courseContent || !courseLog) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ProgressBar content={courseContent} progress={progress} />
      <CourseContentView
        content={courseContent}
        progress={progress}
        setProgress={setProgress}
        controlState={controlState}
        setControlState={setControlState}
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
