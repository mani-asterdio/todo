import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form/form";
import TaskList from "./components/TaskList/TaskList";

export type TaskData = {
  id: number;
  task: string;
  isCompleted: boolean;
  addedDate: Date;
  completedDate: Date | null;
};

const DATA: TaskData[] = [
  {
    id: 1,
    task: "Buy Groceries",
    isCompleted: false,
    addedDate: new Date(Date.now()),
    completedDate: null,
  },
  {
    id: 2,
    task: "Learn TypeScript generics",
    isCompleted: false,
    addedDate: new Date(Date.now()),
    completedDate: null,
  },
  {
    id: 3,
    task: "Do Laundry",
    isCompleted: false,
    addedDate: new Date(Date.now()),
    completedDate: null,
  },
  {
    id: 4,
    task: "Watch Inception",
    isCompleted: true,
    addedDate: new Date(Date.now()),
    completedDate: new Date(Date.now()),
  },
];
function App() {
  const [taskData, setTaskData] = useState<TaskData[]>(() => {
    const savedData = localStorage.getItem("tasks");
    return savedData ? JSON.parse(savedData) : DATA;
  });

  const [taskProps, setTaskProps] = useState<TaskData[]>(taskData);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editTaskName, setEditTaskName] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("");

  useEffect(() => {
    setTaskData(() => {
      const savedData = localStorage.getItem("tasks");
      return savedData ? JSON.parse(savedData) : DATA;
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskData));

    const localData = JSON.parse(localStorage.getItem("tasks") || "");
    if (activeTab === "todo") {
      const updatedData = localData.filter(
        (task: TaskData) => !task.isCompleted
      );
      setTaskProps(updatedData);
    } else if (activeTab === "completed") {
      const updatedData = localData.filter(
        (task: TaskData) => task.isCompleted
      );
      setTaskProps(updatedData);
    } else {
      setTaskProps(taskData);
    }
  }, [taskData, activeTab]);

  const completeTask = (id: number) => {
    setTaskData((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              isCompleted: !task.isCompleted,
              completedDate: task.isCompleted ? null : new Date(Date.now()),
            }
          : task
      )
    );
  };

  const deleteTask = (id: number) => {
    const updatedData = taskData.filter((task) => task.id != id);
    setTaskData(updatedData);
  };

  const addTask = (task: string) => {
    const newTask: TaskData = {
      id: Date.now() + Math.random(),
      task: task,
      isCompleted: false,
      addedDate: new Date(Date.now()),
      completedDate: null,
    };
    setTaskData((prevState) => [...prevState, newTask]);
  };

  const editModeUpdater = (id: number) => {
    setEditMode(true);
    setEditId(id);

    const editTask = taskData.find((task) => task.id === id)!;
    setEditTaskName(editTask.task);
  };

  const editTask = (newName: string) => {
    setTaskData((prevTasks) =>
      prevTasks.map((task) =>
        task.id === editId
          ? {
              ...task,
              task: newName,
              completedDate: task.completedDate ? task.completedDate : null,
            }
          : task
      )
    );
    setEditMode(false);
    setEditId(null);
  };

  const handleRadioChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setActiveTab(event.target.value);
    },
    [activeTab]
  );

  // const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setActiveTab(event.target.value);
  // };

  return (
    <div className="app-container">
      <div className="app">
        <h1>Todo App</h1>
        <form className="radio-form">
          <input
            type="radio"
            name="filtertodo"
            value="all"
            onChange={handleRadioChange}
          />
          All
          <input
            type="radio"
            name="filtertodo"
            value="completed"
            onChange={handleRadioChange}
          />
          Completed
          <input
            type="radio"
            name="filtertodo"
            value="todo"
            onChange={handleRadioChange}
          />
          To do
        </form>
        <Form
          placeholder="What needs to be done..."
          type="text"
          submitFunction={editMode ? editTask : addTask}
          editMode={editMode}
          editTaskName={editTaskName}
        />
        <TaskList
          taskData={taskProps}
          deleteTask={deleteTask}
          completeTask={completeTask}
          editModeUpdater={editModeUpdater}
        />
      </div>
    </div>
  );
}

export default App;
