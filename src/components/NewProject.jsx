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
        <h2 className='text-xl font-bold text-stone-700 my-4'>Invalid Input</h2>
        <p className='text-stone-600 mb-4'>Ooops...</p>
        <p className='text-stone-600 mb-4'>Please make sure you provide a valid value for every input field.</p>
    </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button className="text-stone-800 hover:text-stone-950" onClick={onCancel}>
              Cancel
            </button>
          </li>
          <li>
            <button
              className="px-6 py-2 rounded-md bg-stone-950 text-stone-50 hover:bg-stone-700"
              onClick={handleSave}
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input type="text" inputRef={title} label="Title" />
          <Input inputRef={description} label="Description" textarea />
          <Input type="date" inputRef={dueDate} label="Due Date" />
        </div>
      </div>
    </>
  );
}

export default NewProject;
