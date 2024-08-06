export interface Quiz {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
}

export type QuizQuestion = SingleQuestion | MultipleQuestion | InputQuestion;

interface SingleChoice {
  id: string;
  statement: string;
  imageUrl?: string;
}

interface MultipleChoice {
  id: string;
  statement: string;
  imageUrl?: string;
}

export interface SingleQuestion {
  type: "v1_single_question";
  id: string;
  question: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  choices: SingleChoice[];
}

export interface MultipleQuestion {
  type: "v1_multiple_question";
  id: string;
  question: string;
  title?: string;
  imageUrl?: string;
  description?: string;
  choices: MultipleChoice[];
  selectionLimit?: number;
}

export interface InputQuestion {
  type: "v1_input_question";
  id: string;
  question: string;
  title?: string;
  imageUrl?: string;
  description?: string;
  inputLimit?: number;
}
