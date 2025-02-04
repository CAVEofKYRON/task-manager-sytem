import { useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";

function NewProject({ onAdd, onCancel }) {

  const modal = useRef();  
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    //--- Validation

    if (
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredDueDate.trim() === ""
    ) {
      modal.current.open()
      return
    }

    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    });
  }

  return (
    <>
    <Modal ref={modal} buttonCaption="Okay">
        <h2 className='text-xl font-bold text-stone-700 my-4'>Ungültige Eingabe</h2>
        <p className='text-stone-600 mb-4'>Uuuups...</p>
        <p className='text-stone-600 mb-4'>Bitte stellen Sie sicher, dass Sie für jedes Eingabefeld einen gültigen Wert angeben.</p>
    </Modal>
      <div className="w-[35rem] mt-16 mr-4">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button className="text-stone-800 hover:text-stone-950" onClick={onCancel}>
              Abbrechen
            </button>
          </li>
          <li>
            <button
              className="px-6 py-2 rounded-md bg-stone-950 text-stone-50 hover:bg-stone-700"
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
        </div>
      </div>
    </>
  );
}

export default NewProject;
