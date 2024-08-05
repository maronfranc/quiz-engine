import { useEffect, useState } from 'react';
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

  useEffect(() => {
    /** @see https://stackoverflow.com/a/66547345 */
    if (document && quiz.imageUrl) {
      document.body.style.background = `url(${quiz.imageUrl}) no-repeat center center`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundAttachment = "fixed";
    }

    return () => {
      document.body.style.background = "";
    }
  }, []);

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
      <div className="background-tube-tv-effect"></div>

      <header>
        <ProgressBar
          value={questionAnswers.length}
          total={quiz.questions.length}
          label="Answer progress" />
      </header>

      <main>
        <h1> {quiz.title} </h1>
        <p> {quiz.description} </p>
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
          Open question
        </button>

        <button
          disabled={
            currentIndex >= questionAnswers.length ||
            currentIndex === quiz.questions.length - 1}
          onClick={() => goToNext()}>
          &rarr;
        </button>

      </footer>

      <QuizModal
        handleSubmitData={handleSubmit}
        isOpen={isModalOpen}
        quizQuestion={quiz.questions[currentIndex]}
        isAlreadyAnswered={currentIndex < questionAnswers.length}
        handleClose={handleModalClose} />
    </div>
  );
}

export default App;
