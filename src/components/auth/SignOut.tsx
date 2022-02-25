import { useTypedDispatch } from "../../redux/store";
import { resetAuth } from "../../redux/authSlice";

import { signOut } from "firebase/auth";
import { firebaseAuth } from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function SignOut() {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();

  const onSignOutButtonClick = async () => {
    try {
      await signOut(firebaseAuth);
      localStorage.clear();
      dispatch(resetAuth(null));
      navigate({ pathname: '/' });
    } catch (error: any) {
      console.error(error.message);
    };
  };

  return (
    <button
      onClick={onSignOutButtonClick}
      className="font-semibold"
    >
      👋 Sign out
    </button>
  );
};
