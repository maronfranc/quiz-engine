import { useState } from 'react';
import InputCheckboxGroup from './components/form/InputCheckboxGroup';
import InputRadioGroup from './components/form/InputRadioGroup';
import ProgressBar from './components/ProgressBar';
import InputText from './components/form/InputText';
import data from "../data/quiz-data.json";
import { Quiz } from './Quiz.interface';
const quiz = data as Quiz;

interface QuizFormState {
  input: string;
  singleAnswerId: string;
  multipleAnswerIds: string[];
}

const INITIAL_STATE: QuizFormState = {
  input: '',
  singleAnswerId: '',
  multipleAnswerIds: [],
}

function App() {
  const [formState, setFormState] = useState<QuizFormState>(INITIAL_STATE);
  const [currentIndex, setCurrentIndex] = useState(0);

  function handleSingleValueChange(value: string) {
    const quizQuestion = quiz.questions[currentIndex];

    if (quizQuestion.type === 'v1_single_question') {
      setFormState((prev) => ({ ...prev, singleAnswerId: value }));
      return;
    }

    if (quizQuestion.type === 'v1_input_question') {
      setFormState((prev) => ({ ...prev, input: value }));
      return;
    }
  }

  function handleMultipleValueChange(data: string[]) {
    setFormState((prev) => ({ ...prev, multipleAnswerIds: data }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(formState);
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
    }
  }

  return (
    <div className="grid">
      <header>
        <ProgressBar
          label="Answer progress"
          value={85} total={100} />
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          <button className="primary" type="submit">
            Confirm answer
          </button>
          <InputText
            id={"19802371289"}
            label="Type your answer here:"
            placeholder="Type your answer here"
            value={formState.input}
            onChange={handleSingleValueChange} />

          <InputRadioGroup
            name="singleQuestion"
            options={[
              { label: 'oijoaisjd', value: "oaijdoijs" },
              { label: '198234821u', value: "198234821u" },
              { label: '891739', value: "oajsdfoasd19028s" },
            ]}
            selectedValue={formState.singleAnswerId}
            label={"Pick one of these options:"}
            onChange={handleSingleValueChange} />

          <InputCheckboxGroup
            name="multipleQuestion"
            options={[
              { label: '12312j', value: "12312j" },
              { label: '456457645', value: "456457645" },
              { label: '76476', value: "76476" },
            ]}
            selectedValues={formState.multipleAnswerIds}
            label={"Choose one of these options:"}
            onChange={handleMultipleValueChange} />
        </form>
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
        <button onClick={() => goToNext()}>Next</button>
      </footer>
    </div>
  );
}

export default App;
