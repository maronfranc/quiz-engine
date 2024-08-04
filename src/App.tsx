import { useState } from 'react';
import ProgressBar from './components/ProgressBar';
import data from "../data/quiz-data.json";
import { Quiz } from './Quiz.interface';
import QuizModal from './components/QuizModal';
const quiz = data as Quiz;

interface QuizFormState {
  input: string;
  singleAnswerId: string;
  multipleAnswerIds: string[];
}

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleSubmit(formData: QuizFormState) {
    console.log(`[Log:formData]:`, formData);
  }

  function goToPrevious() {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }

  function goToNext() {
    // if (currentIndex < questionAnswers.length) {
    const lastIndex = quiz.questions.length - 1;
    setCurrentIndex((prev) => Math.min(prev + 1, lastIndex));
    // }
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
          label="Answer progress"
          value={85} total={100} />
      </header>

      <main>
        Main
      </main>

      <aside>
        {quiz.questions.map((_, index) => {
          const current = index === currentIndex ? "secondary" : "";
          return <button
            className={`btn-sidebar ${current}`}
            key={index}
            onClick={() => goToTab(index)}>
            {index + 1}
          </button>
        })}
      </aside>

      <footer>
        <button onClick={() => goToPrevious()}>Previous</button>

        <button onClick={() => setIsModalOpen(true)}>
          Open next question
        </button>

        <button onClick={() => goToNext()}>Next</button>

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
