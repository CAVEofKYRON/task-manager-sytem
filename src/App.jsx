import { useState, useEffect } from "react";
import ProjectsSideBar from "./components/ProjectsSidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";

function App() {
  // Initialisierung des States aus localStorage (falls vorhanden)
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

  // Persistierung des States im localStorage bei jeder Änderung
  useEffect(() => {
    localStorage.setItem("projectState", JSON.stringify(projectState));
  }, [projectState]);

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
    setProjectState((prevState) => {
      const newProject = {
        ...projectData,
        id: Math.random(),
      };

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handleDeleteProject() {
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: undefined,
      projects: prevState.projects.filter(
        (project) => project.id !== prevState.selectedProjectId
      ),
    }));
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
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSideBar
        onStartAddProject={handleStartAddProject}
        onSelectProject={handleSelectProject}
        projects={projectState.projects}
        selectedProjectId={projectState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
