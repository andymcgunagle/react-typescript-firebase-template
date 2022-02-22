import { useDeleteAccount } from "../../hooks/useDeleteAccount";

export default function ConfirmDeleteAccountDialog({
  setShowConfirmDelete,
}: ConfirmDeleteAccountDialogProps) {
  const deleteAccount = useDeleteAccount();

  return (
    <div className="card-standard absolute top-0 bottom-0 left-0 right-0 m-auto bg-white border-2 border-gray-900 max-w-[90%] max-h-fit">
      <h2 className="heading-h2">
        Are you sure you want to delete your account?
      </h2>
      <p>
        This action cannot be undone 😟
      </p>
      <div className="flex justify-between">
        <button
          className="button-outlined-danger"
          onClick={deleteAccount}
        >
          Yes, my delete account forever...
        </button>
        <button
          onClick={() => setShowConfirmDelete(false)}
          className="button-outlined"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

interface ConfirmDeleteAccountDialogProps {
  setShowConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>,
};
