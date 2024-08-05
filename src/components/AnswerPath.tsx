import { QuizQuestion } from "../Quiz.interface";
import { QuizFormState } from "./QuizModal";

export interface QuestionAnswer {
  question: QuizQuestion;
  answer: QuizFormState;
}

interface Props {
  questionAnswers: QuestionAnswer[];
}

function AnswerPath({ questionAnswers }: Props) {
  return (
    <div>
      {questionAnswers.map((q, index) => {
        const { question, answer } = q;
        if (question.type === 'v1_single_question' || question.type === 'v1_multiple_question') {
          return <div className="answer-container" key={index}>
            <h2 className="title">
              {index + 1}. {question.title}
            </h2>
            <p className="description">
              {question.description}
            </p>
            <p className="description">
              Question: {question.question}
            </p>

            <div className="space-between">
              {question.choices.map((c) => (
                <div
                  className={`image-container card ${c.id === answer.singleAnswerId ||
                    answer.multipleAnswerIds.includes(c.id) ? "success" : "danger"}  `}
                  style={{
                    backgroundImage: c.imageUrl && `url(${c.imageUrl})`,
                    backgroundSize: c.imageUrl && "cover",
                    backgroundPosition: c.imageUrl && "center",
                  }}
                >
                  {c.statement}
                </div>))}
            </div>
          </div>
        }

        if (question.type === 'v1_input_question') {
          return <div className="answer-container " key={index}>
            <h2 className="title">
              {index + 1}. {question.title}
            </h2>
            <p className="description">
              {question.description}
            </p>
            <p className="description">
              Question: {question.question}
            </p>
            <div className="card success">
              {answer.input}
            </div>
          </div>
        }

        return null;
      })}
    </div>
  );
}

export default AnswerPath;
