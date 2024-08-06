import { useState } from 'react';
import ProgressBar from './components/ProgressBar';
import { Quiz } from './Quiz.interface';
import QuizModal from './components/QuizModal';
import AnswerPath, { QuestionAnswer } from './components/AnswerPath';
import Parallax from './components/Parallax';

import data from "../data/quiz-data.json";
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
    setCurrentIndex(index);
    setIsModalOpen(true);
  }

  const isFinished = questionAnswers.length === quiz.questions.length;
  const isNotAvailableYet = currentIndex >= questionAnswers.length;
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
        questionAnswers={questionAnswers} 
        currentIndex={currentIndex}
        />
      </main>

      <aside>
        {quiz.questions.map((_, index) => {
          const isNotReadyYet = index > questionAnswers.length;
          const current = index === currentIndex && "accent";
          const answered = index < questionAnswers.length && "success";
          return <button
            disabled={isNotReadyYet}
            className={`btn-sidebar ${current || answered}`}
            key={index}
            onClick={() => goToTab(index)}>
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
          className="footer-btn-left"
          disabled={currentIndex === 0}
          onClick={() => goToPrevious()}>
          &larr; Previous
        </button>

        <button
          className="footer-btn-next"
          disabled={isFinished}
          onClick={() => setIsModalOpen(true)}>
          {!isFinished ? "Open question" : "Finished"}
        </button>

        <button
          className="footer-btn-right"
          disabled={isNotAvailableYet || isLastQuestion}
          onClick={() => goToNext()}>
          Next &rarr;
        </button>
      </footer>

      <QuizModal
        handleSubmitData={handleSubmit}
        isOpen={isModalOpen}
        quizQuestion={quiz.questions[currentIndex]}
        isAlreadyAnswered={isAlreadyAnswered}
        handleClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;
