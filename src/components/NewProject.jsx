import { useRef, useState } from "react";
import Input from "./Input";
import Modal from "./Modal";

function NewProject({ onAdd, onCancel }) {
  const modal = useRef();
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  // State für die Dringlichkeitsstufe (initial keine Auswahl)
  const [selectedUrgency, setSelectedUrgency] = useState(null);

  // Definition der vier Optionen mit passender Beschriftung
  const urgencyOptions = [
    { value: 1, label: "dringend & wichtig" },
    { value: 2, label: "dringend & nicht wichtig" },
    { value: 3, label: "nicht dringend & wichtig" },
    { value: 4, label: "weder dringend noch wichtig" },
  ];

  // Mapping der Dringlichkeitsfarben
  const urgencyStyles = {
    1: {
      dot: "bg-red-500",
      active: "bg-red-500 text-white rounded-md shadow-md",
      inactive: "bg-stone-200 text-stone-700 rounded-md shadow-sm",
    },
    2: {
      dot: "bg-orange-500",
      active: "bg-orange-500 text-white rounded-md shadow-md",
      inactive: "bg-stone-200 text-stone-700 rounded-md shadow-sm",
    },
    3: {
      dot: "bg-green-600",
      active: "bg-green-600 text-white rounded-md shadow-md",
      inactive: "bg-stone-200 text-stone-700 rounded-md shadow-sm",
    },
    4: {
      dot: "bg-gray-400",
      active: "bg-gray-400 text-white rounded-md shadow-md",
      inactive: "bg-stone-200 text-stone-700 rounded-md shadow-sm",
    },
  };

  function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    // Validation: Alle Felder müssen ausgefüllt sein und eine Dringlichkeitsstufe ausgewählt sein
    if (
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredDueDate.trim() === "" ||
      selectedUrgency === null
    ) {
      modal.current.open();
      return;
    }

    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
      urgency: selectedUrgency,
    });
  }

  return (
    <>
      <Modal ref={modal} buttonCaption="Okay">
        <h2 className="text-xl font-bold text-stone-700 my-4 dark:text-stone-200">
          Ungültige Eingabe
        </h2>
        <p className="text-stone-600 mb-4 dark:text-stone-300">Uuuups...</p>
        <p className="text-stone-600 mb-4 dark:text-stone-300">
          Bitte stellen Sie sicher, dass Sie für jedes Eingabefeld einen
          gültigen Wert angeben.
          {selectedUrgency === null &&
            " (Bitte wählen Sie eine Dringlichkeitsstufe aus)"}
        </p>
      </Modal>
      <div className="w-full mt-8 md:mt-16 mr-0 md:mr-4">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              className="text-stone-800 hover:text-stone-950 dark:text-stone-200 dark:hover:text-stone-50"
              onClick={onCancel}
            >
              Abbrechen
            </button>
          </li>
          <li>
            <button
              className="px-6 py-3 rounded-md bg-stone-950 text-stone-50 hover:bg-stone-700 dark:bg-stone-300 dark:text-stone-900 dark:hover:bg-stone-400 transition-colors duration-200"
              onClick={handleSave}
            >
              Speichern
            </button>
          </li>
        </menu>
        <div>
          <Input type="text" inputRef={title} label="Titel" />
          <Input inputRef={description} label="Beschreibung" textarea />
          <Input type="date" inputRef={dueDate} label="Fälligkeit" />

          {/* Button-Gruppe zur Auswahl der Dringlichkeit */}
          <div className="flex flex-col gap-2 my-4">
            <label className="text-sm font-bold uppercase text-stone-500 dark:text-stone-300">
              Dringlichkeit
            </label>
            {urgencyOptions.map((option) => {
              const isSelected = selectedUrgency === option.value;
              const dotColor = urgencyStyles[option.value].dot;
              const buttonClasses = isSelected
                ? urgencyStyles[option.value].active
                : urgencyStyles[option.value].inactive;
              return (
                <button
                  key={option.value}
                  onClick={() => setSelectedUrgency(option.value)}
                  className={`w-full text-left px-4 py-2 flex items-center transition-colors duration-200 text-lg ${buttonClasses}`}
                >
                  <span
                    className={`inline-block w-4 h-4 rounded-full mr-3 ${dotColor}`}
                  />
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default NewProject;
