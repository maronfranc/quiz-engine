import { QuizQuestion } from "../Quiz.interface";
import { QuizFormState } from "./QuizModal";

export interface QuestionAnswer {
  question: QuizQuestion;
  answer: QuizFormState;
}

interface Props {
  questionAnswers: QuestionAnswer[];
  currentIndex: number;
}

function AnswerPath({ questionAnswers, currentIndex }: Props) {
  return (
    <div className="answer-container">
      {questionAnswers.map((q, index) => {
        const { question, answer } = q;
        if (question.type === 'v1_single_question' || question.type === 'v1_multiple_question') {
          return <div
            className={`answer-card ${currentIndex === index && "selected"}`}
            key={index}>
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
              {question.choices
                .filter((c) => {
                  const isPickedMultiple = answer.multipleAnswerIds.length !== 0
                    && answer.multipleAnswerIds.includes(c.id);
                  const isPickedSingle = answer.singleAnswerId
                    && c.id === answer.singleAnswerId;
                  return isPickedMultiple || isPickedSingle;
                })
                .map((c) => (
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
                  </div>
                ))
              }
            </div>
          </div>
        }

        if (question.type === 'v1_input_question') {
          return <div className={`answer-card ${currentIndex === index && "selected"}`} key={index}>
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
              <p className="title">
                {answer.input}
              </p>
            </div>
          </div>
        }

        return null;
      })}
    </div>
  );
}

export default AnswerPath;
