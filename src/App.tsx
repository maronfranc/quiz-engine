import jsonData from "../data/quiz-data.json";
const quiz = jsonData as Quiz;

import { useState } from 'react';
import ProgressBar from './components/ProgressBar';
import { Quiz } from './Quiz.interface';
import QuizModal from './components/QuizModal';
import AnswerPath, { QuestionAnswer } from './components/AnswerPath';
import Parallax from './components/Parallax';

interface QuizFormState {
  input: string;
  singleAnswerId: string;
  multipleAnswerIds: string[];
}

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionAnswers, setQuestionAnswers] = useState<QuestionAnswer[]>([]);

  function goToPrevious() {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }

  function goToNext() {
    if (currentIndex < questionAnswers.length) {
      const lastIndex = quiz.questions.length - 1;
      setCurrentIndex((prev) => Math.min(prev + 1, lastIndex));
    }
  }

  function goToTabModal(index: number) {
    setCurrentIndex(index);
    setIsModalOpen(true);
  }

  function scrollToBottom() {
    if (window && document) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  function handleSubmit(formData: QuizFormState) {
    const question = quiz.questions[currentIndex];
    const nextIndex = Math.min(currentIndex + 1, quiz.questions.length - 1);

    setQuestionAnswers((prev) => [...prev, { answer: formData, question }]);
    setCurrentIndex(nextIndex);

    /** 
     * FIXME: using this function here as a workarond for what seems to be a cycle bug.
     * - The apparent render cycle bug is 1:
     *   1. The `setCurrentIndex(nextIndex)` trigger a scroll animation inside the card component.
     *   2. But the animation runs before the component is rendered in the page. 
     * The apparent render cycle bug is 2:
     *   1. The `setCurrentIndex(nextIndex)` is being set from N to N+1 and back to N somewhere.
     */
    async function scrollDelay() {
      const ANIMATION_DELAY_MS = 250;
      await new Promise<void>(resolve => setTimeout(resolve, ANIMATION_DELAY_MS));
      scrollToBottom();
    }
    scrollDelay();
  }

  const isFinished = questionAnswers.length === quiz.questions.length;
  const isNotAvailableYet = currentIndex >= questionAnswers.length - 1;
  const isLastQuestion = currentIndex === quiz.questions.length - 1;
  const isAlreadyAnswered = currentIndex < questionAnswers.length;

  return (
    <div className="grid">
      <header>
        <ProgressBar
          value={questionAnswers.length}
          total={quiz.questions.length}
          label="Answer progress" />
        <Parallax
          title={quiz.title}
          paragraph={quiz.description}
          backgroundImage={quiz.imageUrl} />
      </header>

      <main>
        <AnswerPath
          handleButtonClick={(index) => goToTabModal(index)}
          questionAnswers={questionAnswers}
          currentIndex={currentIndex} />
      </main>

      <aside>
        {quiz.questions.map((_, index) => {
          const isNotReadyYet = index >= questionAnswers.length;
          const current = index === currentIndex && "accent";
          const answered = index < questionAnswers.length && "success";
          return <button
            disabled={isNotReadyYet}
            className={`btn-sidebar ${current || answered}`}
            key={index}
            onClick={() => setCurrentIndex(index)}>
            {index + 1}

            <span className="sr-only">
              {!isNotReadyYet
                ? `Open question number: ${index + 1}.`
                : `Question number ${index + 1} is diabled. Complete previous questions.`}
            </span>
          </button>
        })}
      </aside>

      <footer>
        <button
          disabled={currentIndex === 0}
          onClick={() => goToPrevious()}>
          &larr; <span className="desktop-only">Previous</span>
        </button>

        <button
          disabled={isFinished}
          onClick={() => goToTabModal(questionAnswers.length)}>
          {!isFinished ? "Next question" : "Finished"}
        </button>

        <button
          disabled={isNotAvailableYet || isLastQuestion}
          onClick={() => goToNext()}>
          <span className="desktop-only">Next</span> &rarr;
        </button>
      </footer>

      <QuizModal
        handleSubmitData={handleSubmit}
        handleClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        quizQuestion={quiz.questions[currentIndex]}
        isAlreadyAnswered={isAlreadyAnswered} />
    </div>
  );
}

export default App;
