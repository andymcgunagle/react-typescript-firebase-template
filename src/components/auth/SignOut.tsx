import { useTypedDispatch } from "../../redux/store";
import { resetAuth } from "../../redux/authSlice";

import { signOut } from "firebase/auth";
import { firebaseAuth } from "../../firebase";

export default function SignOut() {
  const dispatch = useTypedDispatch();

  const onSignOutButtonClick = async () => {
    try {
      await signOut(firebaseAuth);
      localStorage.clear();
      dispatch(resetAuth(null));
    } catch (error: any) {
      console.error(error.message);
    };
  };

  return (
    <button
      onClick={onSignOutButtonClick}
      className="button-text font-semibold"
    >
      👋 Sign out
    </button>
  );
};