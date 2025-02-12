
import useModalStore from "../../stores/useModalStore";
import TodoForm from "./TodoForm";

const Modal = () => {
  const { mode, setShowModal, showModal } = useModalStore();

  if (!showModal) return null;

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h2>Let&apos;s {mode} your task</h2>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>
        <TodoForm />
      </div>
    </div>
  );
};

export default Modal;
