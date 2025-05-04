export interface Content {
  type: string;
  image?: string;
  title?: string;
  text?: string[];
  example?: string[];
  exercise?: Exercise;
}

export interface Exercise {
  id: string;
  type: string;
  options?: string[];
  starter?: string;
  answer: string;
  points: number;
  explanation: string;
  response: {
    correct: string;
    incorrect: string;
  };
}

export interface ExerciseLog {
  exerciseId: string;
  completed: boolean;
  data: Record<string, Exercise>;
}

export interface CourseLog {
  courseId: string;
  title: string;
  progress: number;
  completed: boolean;
  exercises: Record<string, ExerciseLog>;
}

export interface UserLog {
  userId: string;
  courses: Record<string, CourseLog>;
}
