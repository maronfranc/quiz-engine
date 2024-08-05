import { useState } from 'react';
import ProgressBar from './components/ProgressBar';
import data from "../data/quiz-data.json";
import { Quiz } from './Quiz.interface';
import QuizModal from './components/QuizModal';
import AnswerPath, { QuestionAnswer } from './components/AnswerPath';
const quiz = data as Quiz;

interface QuizFormState {
  input: string;
  singleAnswerId: string;
  multipleAnswerIds: string[];
}

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionAnswers, setQuestionAnswers] = useState<QuestionAnswer[]>([]);

  function handleSubmit(formData: QuizFormState) {
    const question = quiz.questions[currentIndex];

    setQuestionAnswers((prev) => [...prev, { answer: formData, question }]);
    goToTab(Math.min(currentIndex + 1, quiz.questions.length - 1));
  }

  function goToPrevious() {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }

  function goToNext() {
    if (currentIndex < questionAnswers.length) {
      const lastIndex = quiz.questions.length - 1;
      setCurrentIndex((prev) => Math.min(prev + 1, lastIndex));
    }
  }

  function goToTab(index: number) {
    if (index !== currentIndex) {
      setCurrentIndex(index);
      setIsModalOpen(true);
    }
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  return (
    <div className="grid">
      <header>
        <ProgressBar
          value={questionAnswers.length}
          total={quiz.questions.length}
          label="Answer progress" />
      </header>

      <main>
        <AnswerPath questionAnswers={questionAnswers} />
      </main>

      <aside>
        {quiz.questions.map((_, index) => {
          const current = index === currentIndex ? "accent" : "";
          const answered = index < questionAnswers.length ? "success" : "";
          const isDisabled = index > questionAnswers.length;
          return <button
            disabled={isDisabled}
            className={`btn-sidebar ${current || answered}`}
            key={index}
            onClick={() => goToTab(index)}>
            {index + 1}

            <span className="sr-only">
              {!isDisabled
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
          &larr;
        </button>

        <button onClick={() => setIsModalOpen(true)}>
          Open next question
        </button>

        <button
          disabled={
            currentIndex >= questionAnswers.length ||
            currentIndex === quiz.questions.length - 1}
          onClick={() => goToNext()}>
          &rarr;
        </button>

        <QuizModal
          handleSubmitData={handleSubmit}
          isOpen={isModalOpen}
          handleClose={handleModalClose}
          quizQuestion={quiz.questions[currentIndex]} />
      </footer>
    </div>
  );
}

export default App;
