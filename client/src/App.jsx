import "./App.css";
import "./index.css";
import { useEffect, useState, useCallback } from "react";
import { useCookies } from "react-cookie";
//!COMPONENTS
import ListHeader from "./components/ListHeader/ListHeader";
import ListItem from "./components/Todo/ListItem";
import Auth from "./components/Auth/Auth";

const App = () => {
  const [cookies, ,] = useCookies(null);
  const [tasks, setTasks] = useState(null);
  const userEmail = cookies.Email;
  const authToken = cookies.Token;

  const getData = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/todos/${userEmail}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Received non-JSON response");
      }

      const json = await response.json();
      setTasks(json);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }, [userEmail]);

  useEffect(() => {
    authToken ? getData() : setTasks(null);
  }, [authToken, getData]);
  console.log(tasks);

  //!Sort by date

  const sortedTask = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="app">
      {!authToken && <Auth />}
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
};

export default App;
