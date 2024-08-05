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
  /** Another question id. Nil mean the quiz ended. */
  questionIdToGo?: string | null;
  imageUrl?: string;
}

interface MultipleChoice {
  id: string;
  statement: string;
  /** Another question id */
  questionIdToGo: string | null;
  /** Number to choose wich `questionIdToGo` to use */
  priority: number;
  imageUrl?: string;
}
type Choice = SingleChoice | MultipleChoice;

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
  /** Another question id. Nil mean the quiz ended. */
  questionIdToGo?: string | null;
  inputLimit?: number;
}

///////////////// SINGLE //////////////////
// single_question_1
// single_question_2
// single_question_3
// sq1_choice_1
// sq1_choice_2
// sq1_choice_3
// sq1_choice_1
// sq2_choice_2
// sq3_choice_3
// sq1_choice_1
// sq2_choice_2
// sq3_choice_3

const singleQuestion: SingleQuestion = {
  "type": "v1_single_question",
  "id": "single_question_1",
  "question": "Question here",
  "title": "Title here",
  "description": "single quesiton description",
  "choices": [
    {
      "id": "sq1_choice_1",
      "statement": "Go to single question 2",
      "questionIdToGo": "single_question_2",
    },
    {
      "id": "sq1_choice_2",
      "statement": "Go to multiple question 1",
      "questionIdToGo": "multiple_question_1",
    },
    {
      "id": "sq1_choice_3",
      "statement": "Go to input question 1",
      "questionIdToGo": "input_question_1",
    },
  ],
}

const singleQuestion2: SingleQuestion = {
  "type": "v1_single_question",
  "id": "single_question_2",
  "question": "Question here",
  "title": "Title here",
  "description": "Single question 2",
  "choices": [
    {
      "id": "sq2_choice_1",
      "statement": "Go to single 3",
      "questionIdToGo": "single_question_3",
    },
    {
      "id": "sq2_choice_2",
      "statement": "Go to multiple 1",
      "questionIdToGo": "multiple_question_1",
    },
    {
      "id": "sq2_choice_3",
      "statement": "Go to input question 1",
      "questionIdToGo": "input_question_1",
    },
  ],
}

const singleQuestion3: SingleQuestion = {
  "type": "v1_single_question",
  "id": "single_question_3",
  "question": "Question here",
  "title": "Title here",
  "description": "Single question 3",
  "choices": [
    {
      "id": "sq3_choice_1",
      "statement": "Finish single",
      "questionIdToGo": null,
    },
    {
      "id": "sq3_choice_2",
      "statement": "Go to multiple 1",
      "questionIdToGo": "multiple_question_1",
    },
    {
      "id": "sq3_choice_3",
      "statement": "Go to input question 1",
      "questionIdToGo": "input_question_1",
    },
  ],
}

///////////////// MULTIPLE //////////////////
// multiple_question_1
// multiple_question_2
// multiple_question_3
// mq1_choice_1
// mq1_choice_2
// mq1_choice_3
// mq1_choice_1
// mq2_choice_2
// mq3_choice_3
// mq1_choice_1
// mq2_choice_2
// mq3_choice_3
const multipleQuestion1: MultipleQuestion = {
  "type": "v1_multiple_question",
  "id": "multiple_question_1",
  "question": "Question here",
  "title": "Title here",
  "description": "Multiple question 1",
  "choices": [
    {
      "id": "mq1_choice_1",
      "statement": "Go to multiple 2",
      "questionIdToGo": "multiple_question_1",
      "priority": 1,
    },
    {
      "id": "mq1_choice_2",
      "statement": "Go to single 1",
      "questionIdToGo": "single_question_1",
      "priority": 2,
    },
    {
      "id": "mq1_choice_3",
      "statement": "Go to input question 1",
      "questionIdToGo": "input_question_1",
      "priority": 3,
    },
  ],
}

const multipleQuestion2: MultipleQuestion = {
  "type": "v1_multiple_question",
  "id": "multiple_question_2",
  "question": "Question here",
  "title": "Title here",
  "description": "Multiple question 2. (2 maximum)",
  "selectionLimit": 2,
  "choices": [
    {
      "id": "mq2_choice_1",
      "statement": "Go to multiple 3",
      "questionIdToGo": "multiple_question_2",
      "priority": 1,
    },
    {
      "id": "mq2_choice_2",
      "statement": "Go to single 1",
      "questionIdToGo": "single_question_1",
      "priority": 2,
    },
    {
      "id": "mq2_choice_3",
      "statement": "Go to input question 1",
      "questionIdToGo": "input_question_1",
      "priority": 3,
    },
  ],
}

const multipleQuestion3: MultipleQuestion = {
  "type": "v1_multiple_question",
  "id": "multiple_question_2",
  "question": "Question here",
  "title": "Title here",
  "description": "Multiple question 3",
  "choices": [
    {
      "id": "mq3_choice_1",
      "statement": "Finish multiple",
      "questionIdToGo": null,
      "priority": 1,
    },
    {
      "id": "mq3_choice_2",
      "statement": "Go to single 1",
      "questionIdToGo": "single_question_1",
      "priority": 2,
    },
    {
      "id": "mq3_choice_3",
      "statement": "Go to input question 1",
      "questionIdToGo": "input_question_1",
      "priority": 3,
    },
  ],
}

///////////////// INPUT //////////////////
// input_question_1
// input_question_2
// input_question_3
// iq1_choice_1
// iq1_choice_2
// iq1_choice_3
// iq1_choice_1
// iq2_choice_2
// iq3_choice_3
// iq1_choice_1
// iq2_choice_2
const inputQuestion1: InputQuestion = {
  "type": "v1_input_question",
  "id": "input_question_1",
  "question": "Question here",
  "title": "Title here",
  "description": "Give your caracter name",
  "inputLimit": 64,
  "questionIdToGo": "input_question_2"
}

const inputQuestion2: InputQuestion = {
  "type": "v1_input_question",
  "id": "input_question_2",
  "question": "Question here",
  "title": "Title here",
  "description": "Write your battle shout",
  "inputLimit": 20,
  "questionIdToGo": "input_question_3"
}

const inputQuestion3: InputQuestion = {
  "type": "v1_input_question",
  "id": "input_question_1",
  "question": "Question here",
  "title": "Title here",
  "description": "Congratulations! Tell us something",
  "inputLimit": 124,
  "questionIdToGo": null
}
