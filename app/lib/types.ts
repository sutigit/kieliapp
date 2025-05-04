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
