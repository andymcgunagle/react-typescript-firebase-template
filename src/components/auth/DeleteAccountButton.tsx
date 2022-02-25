import { useState } from "react";

import ConfirmDeleteAccountDialog from "./ConfirmDeleteAccountDialog";

export default function DeleteAccountButton() {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  return (
    <div>
      {showConfirmDelete &&
        <ConfirmDeleteAccountDialog
          setShowConfirmDelete={setShowConfirmDelete}
        />
      }
      <button
        onClick={() => setShowConfirmDelete(true)}
        className="button-outlined-danger font-semibold"
      >
        Delete Account
      </button>
    </div>
  );
};
