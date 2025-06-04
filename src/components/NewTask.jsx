import { useState, useEffect } from "react";

function NewTask({ onAdd, projectDueDate }) {
  const [enteredTask, setEnteredTask] = useState("");
  const [enteredDate, setEnteredDate] = useState(projectDueDate || "");

  useEffect(() => {
    setEnteredDate(projectDueDate || "");
  }, [projectDueDate]);

  function handleChange(event) {
    setEnteredTask(event.target.value);
  }

  function handleClick() {
    if (enteredTask.trim() !== "") {
      onAdd(enteredTask, enteredDate);
      setEnteredTask("");
      setEnteredDate(projectDueDate || "");
    }
  }

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200 text-stone-600 dark:bg-stone-700 dark:text-stone-100"
        onChange={handleChange}
        value={enteredTask}
      />
      <input
        type="date"
        className="px-2 py-1 rounded-sm bg-stone-200 text-stone-600 dark:bg-stone-700 dark:text-stone-100"
        onChange={(e) => setEnteredDate(e.target.value)}
        value={enteredDate}
      />
      <button
        className="py-1 px-2 md:px-3 text-xs md:text-sm rounded-md bg-stone-500 text-stone-100 hover:bg-stone-600 dark:bg-stone-400 dark:text-stone-900 dark:hover:bg-stone-500 transition-colors duration-200"
        onClick={handleClick}
      >
        Aufgabe hinzufügen
      </button>
    </div>
  );
}

export default NewTask;
