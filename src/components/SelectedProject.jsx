import { useState, useRef } from "react";
import Tasks from "./Tasks";
import ConfirmationModal from "./ConfirmationModal";

function SelectedProject({
  project,
  tasks,
  onDelete,
  onAddTask,
  onDeleteTask,
  onEditTask,
}) {
  const [showTasks, setShowTasks] = useState(false);
  const confirmModalRef = useRef();

  const formattedDate = new Date(project.dueDate).toLocaleDateString("de-DE", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="w-full mt-8 md:mt-16 mr-0 md:mr-4">
      <header className="pb-4 mb-4 border-b-2 border-stone-300 dark:border-stone-600">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2 dark:text-stone-300">
            {project.title}
          </h1>
          <button
            className="text-stone-600 hover:text-stone-950 dark:text-stone-300 dark:hover:text-stone-50"
            onClick={() => {
              confirmModalRef.current.open();
            }}
          >
            LÖSCHEN
          </button>
        </div>
        <p className="mb-4 text-stone-400 dark:text-stone-300">
          {formattedDate}
        </p>
        <p className="text-stone-600 whitespace-pre-wrap dark:text-stone-300">
          {project.description}
        </p>
        <div className="mt-4">
          <button
            className="text-sm font-medium text-stone-600 bg-stone-300 hover:bg-stone-400 focus:outline-none rounded-md px-3 py-1 transition-colors duration-200 dark:text-stone-300 dark:bg-stone-700 dark:hover:bg-stone-600"
            onClick={() => setShowTasks(!showTasks)}
          >
            {showTasks ? "Aufgaben ausblenden" : "Aufgaben einblenden"}
          </button>
        </div>
      </header>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          showTasks ? "max-h-[1000px]" : "max-h-0"
        }`}
      >
        <Tasks
          onAdd={onAddTask}
          onDelete={onDeleteTask}
          onEdit={onEditTask}
          tasks={tasks}
        />
      </div>
      <ConfirmationModal
        ref={confirmModalRef}
        title="Projekt löschen"
        message={`Möchtest du das Projekt "${project.title}" wirklich löschen?`}
        confirmText="Löschen"
        cancelText="Abbrechen"
        onConfirm={() => {
          onDelete(project.id);
        }}
        onCancel={() => {}}
      />
    </div>
  );
}

export default SelectedProject;
