import { TaskData } from "../../App";
import TaskItem from "./TaskItem";
import "./tasklist.css";

export default function TaskList({
  taskData,
  deleteTask,
  completeTask,
  editModeUpdater,
}: {
  taskData: TaskData[];
  deleteTask: (id: number) => void;
  completeTask: (id: number) => void;
  editModeUpdater: (id: number) => void;
}) {
  return (
    <div className="taskListContainer">
      {taskData.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          task={task.task}
          isCompleted={task.isCompleted}
          addedDate={task.addedDate}
          completedDate={task.completedDate}
          deleteTask={deleteTask}
          completeTask={completeTask}
          editModeUpdater={editModeUpdater}
        />
      ))}
    </div>
  );
}
