import { useEffect, useRef } from "react";
import { QuizQuestion } from "../Quiz.interface";
import { QuizFormState } from "./QuizModal";

export interface QuestionAnswer {
  question: QuizQuestion;
  answer: QuizFormState;
}

interface Props {
  questionAnswers: QuestionAnswer[];
  currentIndex: number;
  handleButtonClick: (index: number) => void;
}

function AnswerPath({
  questionAnswers,
  currentIndex,
  handleButtonClick: parentHandleButtonClick,
}: Props) {
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const currentRef = cardRefs.current[currentIndex];
    currentRef?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [cardRefs, currentIndex]);

  return (
    <div className="answer-container">
      {questionAnswers.map((q, index) => {
        const { question, answer } = q;
        if (question.type === 'v1_single_question' || question.type === 'v1_multiple_question') {

          return <div
            ref={el => el && (cardRefs.current[index] = el)}
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
                    key={c.id}
                    className={`image-container card ${c.id === answer.singleAnswerId ||
                      answer.multipleAnswerIds.includes(c.id) ? "success" : "danger"}  `}
                    style={{
                      backgroundImage: c.imageUrl && `url(${c.imageUrl})`,
                      backgroundSize: c.imageUrl && "cover",
                      backgroundPosition: c.imageUrl && "center",
                    }}>
                    {c.statement}
                  </div>
                ))
              }
            </div>
            <div className="answer-button-container">
              <button onClick={() => parentHandleButtonClick(index)}>
                Open question
              </button>
            </div>
          </div>
        } else if (question.type === 'v1_input_question') {
          return <div
            ref={el => el && (cardRefs.current[index] = el)}
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
            <div className="card success">
              <p className="title">
                {answer.input}
              </p>
            </div>

            <div className="answer-button-container">
              <button onClick={() => parentHandleButtonClick(index)}>
                Open question
              </button>
            </div>
          </div>
        }

        return null;
      })}
    </div>
  );
}

export default AnswerPath;
