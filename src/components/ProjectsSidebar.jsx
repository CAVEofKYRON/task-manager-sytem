import Button from "./Button.jsx";

function ProjectsSideBar({
  onStartAddProject,
  projects,
  onSelectProject,
  selectedProjectId,
  darkMode,
  toggleDarkMode,
}) {
  // Mapping der Dringlichkeitsstufen zu Farbstilen (Tailwind-Klassen)
  const urgencyStyles = {
    1: { normal: "bg-red-500 text-white", selected: "bg-red-700 text-white" },
    2: {
      normal: "bg-orange-500 text-white",
      selected: "bg-orange-700 text-white",
    },
    3: { normal: "bg-blue-500 text-white", selected: "bg-blue-700 text-white" },
    4: {
      normal: "bg-green-500 text-white",
      selected: "bg-green-700 text-white",
    },
  };

  // Sortiere die Projekte anhand der Dringlichkeit (niedriger Wert = höhere Priorität)
  const sortedProjects = [...projects].sort(
    (p1, p2) => p1.urgency - p2.urgency
  );

  return (
    <aside className="w-full px-8 py-16 bg-stone-200 text-stone-900 md:w-72 rounded-xl dark:bg-stone-900 dark:text-stone-50">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-bold uppercase md:text-xl">Projekt</h2>
        <button onClick={toggleDarkMode} className="text-2xl">
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
      <div>
        <Button onClick={onStartAddProject}>+ Projekt hinzufügen</Button>
      </div>
      <ul className="mt-8">
        {sortedProjects.map((project) => {
          const isSelected = project.id === selectedProjectId;
          const urgency = project.urgency;
          const style = urgencyStyles[urgency] || urgencyStyles[4];
          const cssClasses =
            "w-full text-left px-4 py-2 rounded-md my-2 text-lg " +
            (isSelected ? style.selected : style.normal);
          return (
            <li key={project.id}>
              <button
                onClick={() => onSelectProject(project.id)}
                className={cssClasses}
              >
                {project.title}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default ProjectsSideBar;
