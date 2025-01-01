import "./App.css";
import { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";

const App = () => {
  const userEmail = "ali@test.com";
  const [tasks, setTasks] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/todos/${userEmail}`);
      const json = await response.json();
      setTasks(json);
    } catch (error) {
      console.error();
    }
  };

  useEffect(() => getData, []);
  console.log(tasks);

  //!Sort by date

  const sortedTask = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="app">
      <ListHeader listName={"ToDo Spark"}  getData={getData}/>
      {sortedTask?.map((task) => (
        <ListItem key={task.id} task={task} getData={getData}/>
      ))}
    </div>
  );
};

export default App;
