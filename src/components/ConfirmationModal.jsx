import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

const ConfirmationModal = forwardRef(
  ({ title, message, confirmText, cancelText, onConfirm, onCancel }, ref) => {
    const dialogRef = useRef();

    useImperativeHandle(ref, () => ({
      open() {
        dialogRef.current.showModal();
      },
      close() {
        dialogRef.current.close();
      },
    }));

    return createPortal(
      <dialog
        ref={dialogRef}
        className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md bg-stone-50 dark:bg-stone-800"
      >
        <h2 className="text-xl font-bold text-stone-700 my-4 dark:text-stone-200">
          {title}
        </h2>
        <p className="text-stone-600 mb-4 dark:text-stone-300">{message}</p>
        <div className="flex justify-end gap-4">
          <Button
            onClick={() => {
              onCancel && onCancel();
              dialogRef.current.close();
            }}
          >
            {cancelText || "Abbrechen"}
          </Button>
          <Button
            onClick={() => {
              onConfirm && onConfirm();
              dialogRef.current.close();
            }}
          >
            {confirmText || "Bestätigen"}
          </Button>
        </div>
      </dialog>,
      document.getElementById("modal-root")
    );
  }
);

export default ConfirmationModal;
