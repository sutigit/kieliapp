export interface CourseContent {
  courseId: string;
  title: string;
  frames: (InstructionFrame | CoverFrame | ExerciseFrame)[];
}

export type FrameType = "instruction" | "cover" | "exercise";

export interface InstructionFrame {
  type: "instruction";
  title: string;
  text: string;
  imageUrl?: string;
}
export interface CoverFrame {
  type: "cover";
  title: string;
  text: string;
  imageUrl: string;
}
export interface ExerciseFrame {
  id: string;
  type: "exercise";
  options?: string[];
  starter?: string;
  answer: string;
  points: number;
  explanation: string;
  responseFrame: {
    correct: string;
    incorrect: string;
  };
}

export interface ExerciseLog {
  exerciseId: string;
  completed: boolean;
  data: Record<string, ExerciseFrame>;
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
