import Button from "./Button";
import noProjectImage from "../assets/no-projects.png";

function NoProjectSelected({ onStartAddProject }) {
  return (
    <div className="mt-24 text-center w-full md:w-2/3">
      <img
        src={noProjectImage}
        alt="An empty task list"
        className="w-16 h-16 object-contain mx-auto"
      />
      <h2 className="text-xl font-bold text-stone-500 my-4 dark:text-stone-200">
        Kein Projekt gewählt
      </h2>
      <p className="text-stone-400 mb-4 dark:text-stone-300">
        Wählen Sie ein Projekt aus oder beginnen Sie mit einem neuen Projekt.
      </p>
      <p className="mt-8">
        <Button onClick={onStartAddProject}>Neues Projekt erstellen</Button>
      </p>
    </div>
  );
}

export default NoProjectSelected;
