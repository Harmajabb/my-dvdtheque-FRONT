import { X } from "lucide-react";
import { useEffect, useRef } from "react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      dialog.showModal();
      closeRef.current?.focus();
    } else {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-message"
      onClose={onCancel}
      className="bg-zinc-800 text-white rounded-lg shadow-2xl p-0 max-w-md w-full backdrop:bg-black/50"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h2
            id="confirm-dialog-title"
            className="text-xl font-bold text-accent"
          >
            {title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onCancel}
            className="text-zinc-400 hover:text-white transition-colors p-1 rounded-md hover:bg-zinc-700"
            aria-label="Fermer"
          >
            <X size={20} />
          </button>
        </div>
        <p id="confirm-dialog-message" className="text-zinc-300 mb-6">
          {message}
        </p>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="btn bg-danger text-white hover:bg-red-700 transition-colors px-6 py-2 rounded-md font-semibold"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default ConfirmDialog;
