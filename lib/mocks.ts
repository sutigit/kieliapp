import content from "@/lib/modules/courses.json";
import { CourseContent, CourseLog, UserLog } from "@/lib/types";

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

export const mockCourseContentRequest = (courseId: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const courses = JSON.parse(JSON.stringify(content));
      const courseContent: CourseContent = courses[courseId];

      if (courseContent) {
        resolve(courseContent);
      } else {
        resolve(null);
      }
    }, 1000);
  });
};

export const mockCourseLogRequest = (userId: string, courseId: string) => {
  return new Promise<CourseLog>((resolve) => {
    setTimeout(() => {
      const courseLog = userLog.courses[courseId];
      if (courseLog) {
        resolve(courseLog);
      } else {
        resolve({
          courseId: "",
          title: "",
          progress: 0,
          completed: false,
          exercises: {},
        });
      }
    }, 1000);
  });
};
