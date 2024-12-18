import { Edit, Trash2 } from "lucide-react";
import "./taskitem.css";

export default function TaskItem({
  id,
  task,  
  isCompleted,  
  deleteTask,
  completeTask,
  editModeUpdater,
}: {
  id: number;
  task: string;
  addedDate: Date;
  isCompleted: boolean;
  completedDate: Date | null;
  deleteTask: (id: number) => void;
  completeTask: (id: number) => void;
  editModeUpdater: (id: number) => void;
}) {
  return (
    <div
      className="taskItemContainer"
      style={{ backgroundColor: isCompleted ? "#b4e3b1" : "#ebedf0" }}
    >
      <div className="task-info__container">
        <div className="checkbox-name">
          <input
            className="checkbox-input"
            type="checkbox"
            checked={isCompleted}
            onChange={() => completeTask(id)}
          />
          <p
            className="task-name"
            style={{ textDecoration: isCompleted ? "line-through" : "none" }}
          >
            {task}
          </p>
        </div>
        {/* <div className="task-dates">
          <p>
            Added: {addedDate?.getDay()}/{addedDate?.getMonth()}/
            {addedDate?.getFullYear()} {addedDate?.getHours()}:
            {addedDate?.getMinutes()}:{addedDate?.getSeconds()}
          </p>
          {completedDate ? (
            <p>
              Completed: {completedDate.getDay()}/{completedDate.getMonth()}/
              {completedDate.getFullYear()} {completedDate.getHours()}:
              {completedDate.getMinutes()}:{completedDate.getSeconds()}
            </p>
          ) : null}
        </div> */}
      </div>
      <div className="icons">
        {!isCompleted && (
          <Edit
            size={20}
            className="edit-icon"
            onClick={() => {
              editModeUpdater(id);
            }}
          />
        )}
        <Trash2
          size={20}
          className="delete-icon"
          onClick={() => deleteTask(id)}
        />
      </div>
    </div>
  );
}
