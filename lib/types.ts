export type ControlState =
  | "static"
  | "exercise-start"
  | "exercise-check"
  | "exercise-correct"
  | "exercise-incorrect"
  | "finish";

export interface CourseContent {
  courseId: string;
  title: string;
  frames: Frame[];
}

export type FrameType = "static" | "cover" | "exercise";
export interface Frame {
  type: FrameType;
  content: CoverFrame | StaticFrame | ExerciseFrame;
}

/**
 * The starting frame of any module - includes a a title, cover image and a description of the study module
 */
export interface CoverFrame {
  title: string;
  text: string[];
  imageUrl: string;
}

/**
 *
 */
export interface StaticFrame {
  title?: string;
  text?: string[];
  imageUrl?: string;
  example?: string[];
}

/**
 * A frame that includes an exercise
 */
export interface ExerciseFrame {
  title?: string;
  text?: string[];
  imageUrl?: string;
  exercise: Exercise;
}

/**
 * Exercise types ----------------------------------------------------------------------------
 */
export type Exercise = ExerciseTypeSelection;

export interface ExerciseTypeSelection {
  id: string;
  type: "selection";
  options: string[];
  answerIndex: number;
  points: number;
  explanation: string;
  responseFrame: {
    correct: string;
    incorrect: string;
  };
}

/**
 * LOGS ---------------------------------------------------------------------------------------
 * logs are for keeping track of the study modules states per user
 */

export interface ExerciseLog {
  exerciseId: string;
  completed: boolean;
  data: Record<string, ExerciseFrame>;
}

/**
 * Information of user specific state of the course
 */
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
