import {
  mockCourseContentRequest,
  mockCourseLogRequest,
} from "@/app/lib/mocks";
import { CourseLog } from "@/app/lib/types";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CourseBody from "../components/course-body";
import CourseHeader from "../components/course-header";

export default function Course() {
  const { id } = useLocalSearchParams();
  const courseId = id as string;

  const [progress, setProgress] = useState(1);
  const [loading, setLoading] = useState(true);

  const [courseContent, setCourseContent] = useState<any>(null);
  const [courseLog, setCourseLog] = useState<CourseLog | null>(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      setLoading(true);
      try {
        const courseContent = await mockCourseContentRequest(courseId);
        const courseLog = await mockCourseLogRequest("user-1", courseId);
        setCourseContent(courseContent);
        setCourseLog(courseLog);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course log:", error);
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
      <CourseHeader content={courseContent} progress={progress} />
      <CourseBody
        content={courseContent}
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
