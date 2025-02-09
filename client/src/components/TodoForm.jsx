import useTodoForm from "../hooks/useTodoForm";
import useModalStore from "../store/useModalStore";

const TodoForm = () => {
  const { data, handleChange, editMode } = useTodoForm();
  const { setShowModal, getData } = useModalStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editMode
      ? `${import.meta.env.VITE_APP_SERVER_URL}/api/todos/${data.id}`
      : `${import.meta.env.VITE_APP_SERVER_URL}/api/todos`;
    const method = editMode ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        console.log("Worked");
        setShowModal(false);
        getData();
        window.location.reload(); // Seite aktualisieren
      } else {
        console.error(`Failed to ${editMode ? "update" : "create"} todo`);
      }
    } catch (error) {
      console.error(error);
    }
  };

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