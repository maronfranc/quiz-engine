import { useEffect, useRef, useState } from "react";
import InputText from '../components/form/InputText.tsx';
import InputRadioGroup from '../components/form/InputRadioGroup.tsx';
import InputCheckboxGroup from '../components/form/InputCheckboxGroup.tsx';
import { MultipleQuestion, QuizQuestion, SingleQuestion } from "../Quiz.interface.ts";

interface Props {
  handleSubmitData: (formState: QuizFormState) => void;
  quizQuestion: QuizQuestion;
  isAlreadyAnswered: boolean;
  handleClose?: () => void;
  isOpen?: boolean;
}

export interface QuizFormState {
  input: string;
  singleAnswerId: string;
  multipleAnswerIds: string[];
}

const INITIAL_STATE: QuizFormState = {
  input: '',
  singleAnswerId: '',
  multipleAnswerIds: [],
}

function QuizModal({
  quizQuestion,
  handleClose: parentHandleClose,
  handleSubmitData: parentHandleSubmit,
  isOpen,
  isAlreadyAnswered,
}: Props) {
  const [formState, setFormState] = useState<QuizFormState>(INITIAL_STATE);
  const dialogRef = useRef<HTMLDialogElement>(null);

  function openModal() {
    setFormState(INITIAL_STATE);
    return dialogRef.current?.showModal();
  }

  function closeModal() {
    return dialogRef.current?.close();
  }

  function handleClose() {
    if (parentHandleClose) parentHandleClose();
  }

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      openModal();
    } else if (dialogRef.current) {
      closeModal();
    }
  }, [isOpen]);

  function handleBackdropClick(e: any) {
    if (!e.target.matches('dialog')) return;
    const { top, bottom, left, right } = e.target.getBoundingClientRect();
    const { clientX: mouseX, clientY: mouseY } = e;

    if (mouseX === 0 && mouseY === 0) return;

    const clickedOutsideOfModalBox = (
      mouseX <= left || mouseX >= right ||
      mouseY <= top || mouseY >= bottom
    );

    if (clickedOutsideOfModalBox) closeModal();
  }

  function handleSingleValueChange(value: string) {
    if (quizQuestion.type === 'v1_single_question') {
      setFormState((prev) => ({ ...prev, singleAnswerId: value }));
      return;
    }

    if (quizQuestion.type === 'v1_input_question') {
      setFormState((prev) => ({ ...prev, input: value }));
      return;
    }
  }

  function handleMultipleValueChange(values: string[]) {
    setFormState((prev) => ({ ...prev, multipleAnswerIds: values }));
  }

  function handleSubmit() {
    parentHandleSubmit(formState);
  }

  return <div>
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      onClose={handleClose}>
      <div className="modal-header">
        <span className="title">{quizQuestion.title}</span>
        <button aria-label="Close" className="danger" onClick={closeModal}>
          <span aria-hidden> x </span>
        </button>
      </div>

      <div className="image-container">
        <img className="image" src={quizQuestion.imageUrl} />
      </div>

      <p className="description">
        {quizQuestion.description}
      </p>


      <form method="dialog" onSubmit={handleSubmit}>
        {quizQuestion.type === 'v1_input_question' &&
          <InputText
            id={quizQuestion.id}
            label={quizQuestion.question}
            value={formState.input}
            placeholder={quizQuestion.question}
            ariaDescription={quizQuestion.question}
            disabled={isAlreadyAnswered}
              limit={quizQuestion.inputLimit}
            onChange={handleSingleValueChange} />}

        {quizQuestion.type === 'v1_single_question' &&
          <InputRadioGroup
            name="singleQuestion"
            options={(quizQuestion as SingleQuestion).choices
              .map((c) => ({
                value: c.id,
                label: c.statement,
                imageUrl: c.imageUrl,
              }))}
            selectedValue={formState.singleAnswerId}
            label={(quizQuestion as SingleQuestion).question}
            onChange={handleSingleValueChange} />}

        {quizQuestion.type === 'v1_multiple_question' &&
          <InputCheckboxGroup
            name="multipleQuestion"
            options={(quizQuestion as MultipleQuestion).choices
              .map((c) => ({
                value: c.id,
                label: c.statement,
                imageUrl: c.imageUrl,
              }))}
            selectedValues={formState.multipleAnswerIds}
            label={quizQuestion.question}
            onChange={handleMultipleValueChange} />}

        <div className="modal-button-container space-between">
          <button type="button" className="secondary" onClick={closeModal}>
            Cancel
          </button>
          <button
            disabled={isAlreadyAnswered}
            className={!isAlreadyAnswered ? "primary" : "disabled"}
            type="submit">
            Confirm answer
          </button>
        </div>
      </form>
    </dialog>
  </div>
}

export default QuizModal;
