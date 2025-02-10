import { useState, useRef } from "react";
import NewTask from "./NewTask";
import ConfirmationModal from "./ConfirmationModal";

function Tasks({ tasks, onAdd, onDelete }) {
  const [taskToDelete, setTaskToDelete] = useState(null);
  const confirmModalRef = useRef();

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
    confirmModalRef.current.open();
  };

  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4 dark:text-stone-300">
        Aufgaben
      </h2>
      <NewTask onAdd={onAdd} />

      {tasks.length === 0 && (
        <p className="text-stone-800 my-4 dark:text-stone-200">
          Dieses Projekt hat noch keine Aufgaben.
        </p>
      )}
      {tasks.length > 0 && (
        <ul className="p-4 mt-8 rounded-md bg-stone-100 dark:bg-stone-700">
          {tasks.map((task) => {
            return (
              <li key={task.id} className="flex justify-between my-4">
                <span className="dark:text-stone-200">{task.text}</span>
                <button
                  className="px-2 py-1 bg-stone-500 rounded-md text-stone-100 hover:bg-red-500 dark:bg-stone-400 dark:text-stone-900 dark:hover:bg-red-600"
                  onClick={() => handleDeleteClick(task)}
                >
                  Entfernen
                </button>
              </li>
            );
          })}
        </ul>
      )}
      <ConfirmationModal
        ref={confirmModalRef}
        title="Aufgabe löschen"
        message={
          taskToDelete
            ? `Möchtest du die Aufgabe "${taskToDelete.text}" wirklich löschen?`
            : "Möchtest du diese Aufgabe wirklich löschen?"
        }
        confirmText="Löschen"
        cancelText="Abbrechen"
        onConfirm={() => {
          if (taskToDelete) {
            onDelete(taskToDelete.id);
            setTaskToDelete(null);
          }
        }}
        onCancel={() => {
          setTaskToDelete(null);
        }}
      />
    </section>
  );
}

export default Tasks;
