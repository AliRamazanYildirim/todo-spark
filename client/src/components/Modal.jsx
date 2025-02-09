import { useEffect } from "react";
import { useCookies } from "react-cookie";
import useModalStore from "../store/useModalStore";

const Modal = () => {
  const { mode, setShowModal, task, getData, data, setData, showModal } = useModalStore();
  const editMode = mode === "edit" ? true : false;
  const [cookies, , ] = useCookies(null);

  useEffect(() => {
    setData({
      user_email: editMode ? task.user_email : cookies.Email,
      title: editMode ? task.title : "",
      progress: editMode ? task.progress : 50,
      date: editMode ? task.date : new Date(),
    });
  }, [editMode, task, cookies.Email, setData]);

  const postData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if(response.status === 200){
        console.log('Worked');
        setShowModal(false);
        getData();
        window.location.reload(); // Seite aktualisieren
      } else {
        console.error('Failed to create todo');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const editData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/todos/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        console.log("Worked");
        setShowModal(false);
        getData();
        window.location.reload(); // Seite aktualisieren
      } else {
        console.error('Failed to update todo');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ [name]: value });
  };

  if (!showModal) return null;

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h2>Let&apos;s {mode} your task</h2>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>
        <form>
          <input
            required
            maxLength={30}
            placeholder="Your task goes here"
            name={"title"}
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
          <input className={mode} type="submit" onClick={editMode ? editData : postData}/>
        </form>
      </div>
    </div>
  );
};

export default Modal;