import "./App.css";
import './index.css';
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
//!COMPONENTS
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";

const App = () => {
  const [cookies, , ] = useCookies(null);
  const [tasks, setTasks] = useState(null);
  const userEmail = cookies.Email;
  const authToken = cookies.Token;

  const getData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/todos/${userEmail}`);
      const json = await response.json();
      setTasks(json);
    } catch (error) {
      console.error();
    }
  };

  useEffect(() => {
    authToken ?  getData() : setTasks(null);
  }, [authToken]);
  console.log(tasks);

  //!Sort by date

  const sortedTask = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="app">
      {!authToken && <Auth/>}
      {authToken && (
        <>
          <ListHeader listName={"ToDo Spark"} getData={getData} />
          <p className="user-email">Welcome back {userEmail}</p>
          {sortedTask?.map((task) => (
            <ListItem key={task.id} task={task} getData={getData} />
          ))}
          <p className="copyright">© Creative Coding LLC</p>
        </>
      )}
    </div>
  );
}

export default App;
