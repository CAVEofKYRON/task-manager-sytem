import { useState, useEffect, useRef } from "react";
import ProjectsSideBar from "./components/ProjectsSidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";
import CalendarImportModal from "./components/CalendarImportModal";
import { importToCalendar } from "./utils/calendarUtils";

function App() {
  // Initialisierung des projectState aus localStorage (falls vorhanden)
  const [projectState, setProjectState] = useState(() => {
    const storedState = localStorage.getItem("projectState");
    return storedState
      ? JSON.parse(storedState)
      : {
          selectedProjectId: undefined,
          projects: [],
          tasks: [],
        };
  });

  // Dark Mode State (wird im localStorage persistiert)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Persistierung des projectState im localStorage bei jeder Änderung
  useEffect(() => {
    localStorage.setItem("projectState", JSON.stringify(projectState));
  }, [projectState]);

  // State für das zuletzt erstellte Projekt, das evtl. in den Kalender importiert werden soll
  const [calendarProject, setCalendarProject] = useState(null);
  const calendarModalRef = useRef();

  function handleAddTask(text) {
    setProjectState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };

      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectState((prevState) => ({
      ...prevState,
      tasks: prevState.tasks.filter((task) => task.id !== id),
    }));
  }

  function handleEditTask(id, newText) {
    setProjectState((prevState) => ({
      ...prevState,
      tasks: prevState.tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      ),
    }));
  }

  function handleSelectProject(id) {
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: id,
    }));
  }

  function handleStartAddProject() {
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: null,
    }));
  }

  function handleCancelAddProject() {
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: undefined,
    }));
  }

  function handleAddProject(projectData) {
    const newProject = {
      ...projectData,
      id: Math.random(),
    };

    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: undefined,
      projects: [...prevState.projects, newProject],
    }));
    // Neues Projekt für den Kalendereintrag speichern und Modal öffnen
    setCalendarProject(newProject);
    setTimeout(() => {
      calendarModalRef.current.open();
    }, 0);
  }

  function handleDeleteProject(projectId) {
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: undefined,
      projects: prevState.projects.filter(
        (project) => project.id !== projectId
      ),
      tasks: prevState.tasks.filter((task) => task.projectId !== projectId),
    }));
  }

  // NEUE Funktion: Aktualisierung der Priorität eines Projekts
  function handleChangeProjectPriority(projectId, newUrgency) {
    setProjectState((prevState) => ({
      ...prevState,
      projects: prevState.projects.map((project) =>
        project.id === projectId ? { ...project, urgency: newUrgency } : project
      ),
    }));
  }

  // Callback für den Fall, dass der Nutzer den Kalendereintrag importieren möchte
  function handleCalendarConfirm(project) {
    importToCalendar(project);
    setCalendarProject(null);
  }

  // Callback, wenn der Nutzer den Import abbricht
  function handleCalendarCancel() {
    setCalendarProject(null);
  }

  // Toggle-Funktion für den Dark Mode
  function toggleDarkMode() {
    setDarkMode((prev) => !prev);
  }

  // Bestimme das aktuell ausgewählte Projekt
  const selectedProject = projectState.projects.find(
    (project) => project.id === projectState.selectedProjectId
  );

  // Filtere die Tasks, die zum aktuell ausgewählten Projekt gehören
  const tasksForSelectedProject = projectState.tasks.filter(
    (task) => task.projectId === projectState.selectedProjectId
  );

  // Je nach ausgewähltem Zustand wird der passende Content gerendert
  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      onEditTask={handleEditTask}
      tasks={tasksForSelectedProject}
    />
  );

  if (projectState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex flex-col md:flex-row gap-4 md:gap-8 px-4 md:px-8">
      <ProjectsSideBar
        onStartAddProject={handleStartAddProject}
        onSelectProject={handleSelectProject}
        projects={projectState.projects}
        selectedProjectId={projectState.selectedProjectId}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        hideOnMobile={projectState.selectedProjectId === null}
        onChangeProjectPriority={handleChangeProjectPriority}
      />
      {content}
      {calendarProject && (
        <CalendarImportModal
          ref={calendarModalRef}
          project={calendarProject}
          onConfirm={handleCalendarConfirm}
          onCancel={handleCalendarCancel}
        />
      )}
    </main>
  );
}

export default App;
