import { useEffect } from "react";
import { useCookies } from "react-cookie";
import useModalStore from "../store/useModalStore";

const useTodoForm = () => {
  const { mode, task, data, setData } = useModalStore();
  const editMode = mode === "edit";
  const [cookies] = useCookies(null);

  useEffect(() => {
    setData({
      user_email: editMode ? task.user_email : cookies.Email,
      title: editMode ? task.title : "",
      progress: editMode ? task.progress : 50,
      date: editMode ? task.date : new Date(),
    });
  }, [editMode, task, cookies.Email, setData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ [name]: value });
  };

  return { data, handleChange, editMode };
};

export default useTodoForm;