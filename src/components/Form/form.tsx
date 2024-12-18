import { useEffect, useState } from "react";
import Button from "../Button/Button";
import "./form.css";

type FormProps = {
  placeholder: string;
  type: string;
  submitFunction: (task: string) => void;
  editMode: boolean;  
  editTaskName: string;
};

export default function Form({
  placeholder,
  submitFunction,
  type,
  editMode,
  editTaskName
}: FormProps) {  
  const [inputData, setInputData] = useState<string>("");

  useEffect(() => {
    if (editTaskName !== undefined) {
      setInputData(editTaskName);
    }
  }, [editTaskName]);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
  };

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitFunction(inputData);
    setInputData("");
  };

  return (
    <form className="form" onSubmit={formSubmitHandler}>
      <input
        className="input"
        placeholder={placeholder}
        type={type}
        value={inputData}
        onChange={inputChangeHandler}
        required
      ></input>
      <Button type="submit" backgroundColor={editMode ? "#6b7280" : "#000"}>
        {editMode ? "Edit" : "Add"} Task
      </Button>
    </form>
  );
}
