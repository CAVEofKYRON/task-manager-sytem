import { useState } from "react";
import Button from "./Button.jsx";

function ProjectsSideBar({
  onStartAddProject,
  projects,
  onSelectProject,
  selectedProjectId,
  darkMode,
  toggleDarkMode,
  hideOnMobile, // Steuerung der Sichtbarkeit in der Smartphone-Ansicht
  onChangeProjectPriority, // Callback zum Ändern der Priorität
}) {
  // Mapping der Dringlichkeitsstufen zu Farbstilen für den Projekt-Button
  const urgencyStyles = {
    1: { normal: "bg-red-500 text-white", selected: "bg-red-700 text-white" },
    2: {
      normal: "bg-orange-500 text-white",
      selected: "bg-orange-700 text-white",
    },
    3: {
      normal: "bg-green-600 text-white",
      selected: "bg-green-700 text-white",
    },
    4: { normal: "bg-gray-400 text-white", selected: "bg-gray-500 text-white" },
  };

  // Definitionen für das Dropdown: Optionen und Styling
  const urgencyOptions = [
    { value: 1, label: "dringend & wichtig" },
    { value: 2, label: "dringend & nicht wichtig" },
    { value: 3, label: "nicht dringend & wichtig" },
    { value: 4, label: "weder dringend noch wichtig" },
  ];

  // Für das Dropdown: Bei Auswahl (active) wird ein etwas dunklerer Farbton verwendet,
  // im inaktiven Zustand erscheint das Feld in der Urgency-Farbe.
  const urgencyStylesDropdown = {
    1: {
      active: "bg-red-700 text-white rounded-md shadow-md",
      inactive: "bg-red-500 text-white rounded-md shadow-sm",
    },
    2: {
      active: "bg-orange-700 text-white rounded-md shadow-md",
      inactive: "bg-orange-500 text-white rounded-md shadow-sm",
    },
    3: {
      active: "bg-green-700 text-white rounded-md shadow-md",
      inactive: "bg-green-600 text-white rounded-md shadow-sm",
    },
    4: {
      active: "bg-gray-500 text-white rounded-md shadow-md",
      inactive: "bg-gray-400 text-white rounded-md shadow-sm",
    },
  };

  // Sortierkriterium ("urgency" oder "dueDate")
  const [sortCriteria, setSortCriteria] = useState("urgency");

  // Sortiere die Projekte je nach ausgewähltem Kriterium
  const sortedProjects = [...projects].sort((p1, p2) => {
    if (sortCriteria === "dueDate") {
      return new Date(p1.dueDate) - new Date(p2.dueDate);
    }
    return p1.urgency - p2.urgency;
  });

  // State zur Steuerung, welches Dropdown gerade geöffnet ist (speichert die project.id)
  const [openDropdown, setOpenDropdown] = useState(null);

  // Klassen-Zusammenstellung: Sidebar soll auf kleinen Bildschirmen (hideOnMobile) ggf. verborgen sein
  const baseClasses =
    "px-8 py-16 bg-stone-200 text-stone-900 rounded-xl dark:bg-stone-900 dark:text-stone-50";
  const widthClasses = "w-full md:w-72";
  const responsiveClasses = hideOnMobile ? "hidden md:block" : "block";
  const asideClassName = `${widthClasses} ${baseClasses} ${responsiveClasses}`;

  return (
    <aside className={asideClassName}>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-bold uppercase md:text-xl">Projekt</h2>
        <button onClick={toggleDarkMode} className="text-2xl">
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
      <div>
        <Button onClick={onStartAddProject}>+ Projekt hinzufügen</Button>
      </div>
      {/* Auswahl des Sortierkriteriums */}
      <div className="mt-4">
        <label className="block text-sm font-bold uppercase text-stone-500 dark:text-stone-300 mb-2">
          Sortieren nach
        </label>
        <select
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
          className="w-full px-2 py-1 rounded-md bg-stone-300 dark:bg-stone-700 dark:text-stone-200"
        >
          <option value="urgency">Dringlichkeit</option>
          <option value="dueDate">Fälligkeit</option>
        </select>
      </div>
      <ul className="mt-8 space-y-2">
        {sortedProjects.map((project) => {
          const isSelected = project.id === selectedProjectId;
          const urgency = project.urgency;
          const style = urgencyStyles[urgency] || urgencyStyles[4];
          const projectButtonClasses =
            "w-full text-left px-4 py-2 rounded-md text-lg " +
            (isSelected ? style.selected : style.normal);

          return (
            <li key={project.id} className="relative">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => onSelectProject(project.id)}
                  className={projectButtonClasses}
                >
                  {project.title}
                </button>
                {/* Drei-Punkte-Button (deutlicher gestaltet) */}
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenDropdown(
                        openDropdown === project.id ? null : project.id
                      );
                    }}
                    className="p-2 text-3xl dark:text-stone-200 text-stone-800 hover:text-stone-400"
                  >
                    ⋮
                  </button>
                  {/* Dropdown-Menü unter dem Drei-Punkte-Button */}
                  {openDropdown === project.id && (
                    <div className="absolute right-0 mt-2 w-80 bg-stone-50 dark:bg-stone-800 rounded-md shadow-lg z-10">
                      {urgencyOptions.map((option) => {
                        const isOptionSelected =
                          project.urgency === option.value;
                        const optionClasses =
                          "w-full text-left px-3 py-2 transition-colors duration-200 text-xl " +
                          (isOptionSelected
                            ? urgencyStylesDropdown[option.value].active
                            : urgencyStylesDropdown[option.value].inactive);
                        return (
                          <button
                            key={option.value}
                            onClick={(e) => {
                              e.stopPropagation();
                              onChangeProjectPriority(project.id, option.value);
                              setOpenDropdown(null);
                            }}
                            className={optionClasses}
                          >
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default ProjectsSideBar;
