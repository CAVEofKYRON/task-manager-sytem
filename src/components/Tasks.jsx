import { useState, useRef } from "react";
import NewTask from "./NewTask";
import ConfirmationModal from "./ConfirmationModal";

function Tasks({ tasks, onAdd, onDelete, onEdit, onToggleCompletion, projectDueDate }) {
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [filter, setFilter] = useState("all");
  const confirmModalRef = useRef();

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
    confirmModalRef.current.open();
  };

  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setEditedText(task.text);
  };

  const handleSaveEdit = () => {
    if (editedText.trim() !== "") {
      onEdit(editingTaskId, editedText);
      setEditingTaskId(null);
      setEditedText("");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4 dark:text-stone-300">
        Aufgaben
      </h2>
      <NewTask onAdd={onAdd} projectDueDate={projectDueDate} />

      {tasks.length > 0 && (
        <div className="flex gap-2 mt-4">
          <button
            className={`px-2 py-1 rounded-md ${
              filter === "all"
                ? "bg-stone-400 text-white dark:bg-stone-500"
                : "bg-stone-200 dark:bg-stone-600 text-stone-800 dark:text-stone-200"
            }`}
            onClick={() => setFilter("all")}
          >
            Alle
          </button>
          <button
            className={`px-2 py-1 rounded-md ${
              filter === "active"
                ? "bg-stone-400 text-white dark:bg-stone-500"
                : "bg-stone-200 dark:bg-stone-600 text-stone-800 dark:text-stone-200"
            }`}
            onClick={() => setFilter("active")}
          >
            Offen
          </button>
          <button
            className={`px-2 py-1 rounded-md ${
              filter === "completed"
                ? "bg-stone-400 text-white dark:bg-stone-500"
                : "bg-stone-200 dark:bg-stone-600 text-stone-800 dark:text-stone-200"
            }`}
            onClick={() => setFilter("completed")}
          >
            Erledigt
          </button>
        </div>
      )}

      {tasks.length === 0 && (
        <p className="text-stone-800 my-4 dark:text-stone-200">
          Dieses Projekt hat noch keine Aufgaben.
        </p>
      )}
      {tasks.length > 0 && (
        <ul className="p-4 mt-8 rounded-md bg-stone-100 dark:bg-stone-700">
          {filteredTasks.map((task) => {
            const isEditing = editingTaskId === task.id;
            return (
              <li key={task.id} className="flex justify-between items-center my-4">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      className="w-64 px-2 py-1 rounded-sm bg-stone-200 text-stone-600 dark:bg-stone-600 dark:text-stone-100"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                    />
                    <div className="flex gap-2">
                      <button
                        className="px-2 py-1 bg-stone-500 rounded-md text-stone-100 hover:bg-stone-600 dark:bg-stone-400 dark:text-stone-900"
                        onClick={handleSaveEdit}
                      >
                        Speichern
                      </button>
                      <button
                        className="px-2 py-1 bg-stone-500 rounded-md text-stone-100 hover:bg-red-500 dark:bg-stone-400 dark:text-stone-900 dark:hover:bg-red-600"
                        onClick={() => setEditingTaskId(null)}
                      >
                        Abbrechen
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => onToggleCompletion(task.id)}
                      />
                      <span
                        className={`dark:text-stone-200 ${task.completed ? "line-through text-stone-400 dark:text-stone-400" : ""}`}
                      >
                        {task.text}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="px-2 py-1 bg-stone-500 rounded-md text-stone-100 hover:bg-stone-600 dark:bg-stone-400 dark:text-stone-900"
                        onClick={() => handleEditClick(task)}
                      >
                        Bearbeiten
                      </button>
                      <button
                        className="px-2 py-1 bg-stone-500 rounded-md text-stone-100 hover:bg-red-500 dark:bg-stone-400 dark:text-stone-900 dark:hover:bg-red-600"
                        onClick={() => handleDeleteClick(task)}
                      >
                        Entfernen
                      </button>
                    </div>
                  </>
                )}
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
