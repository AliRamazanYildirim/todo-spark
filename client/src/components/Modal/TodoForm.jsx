import useTodoForm from "../../hooks/useTodoForm";
import useModalStore from "../../store/useModalStore";

const TodoForm = () => {
  const { data, handleChange, editMode } = useTodoForm();
  const { handleSubmit } = useModalStore();
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        required
        maxLength={30}
        placeholder="Your task goes here"
        name="title"
        value={data.title}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="range">Drag select your current progress</label>
      <input
        id="range"
        type="range"
        min="0"
        max="100"
        name="progress"
        value={data.progress}
        onChange={handleChange}
      />
      <input className={editMode ? "edit" : "create"} type="submit" />
    </form>
  );
};

export default TodoForm;
