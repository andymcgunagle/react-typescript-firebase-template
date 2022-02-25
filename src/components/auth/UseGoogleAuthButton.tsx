import { setUid } from "../../redux/authSlice";
import { useTypedDispatch } from "../../redux/store";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { firebaseAuth, firestoreDB } from "../../firebase";

import { useNavigate } from "react-router-dom";

import googleLogo from "../../images/google-logo.svg.png";

export default function UseGoogleAuthButton({
  buttonStyle = 'button-standard',
  setErrorMessage,
  setShowErrorMessage,
}: UseGoogleAuthButtonProps) {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const authorizeWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(firebaseAuth, provider);

      await setDoc(doc(firestoreDB, 'users', result.user.uid, 'settings', 'publicUserInfo'), { firstName: result.user.displayName?.split(' ')[0] });

      dispatch(setUid(result.user.uid));
      navigate({ pathname: '/' });
    } catch (error: any) {
      if (error.message) {
        setErrorMessage(error.message);
        setShowErrorMessage(true);
      };
      console.error(error);
    };
  };

  return (
    <button
      type="button"
      onClick={authorizeWithGoogle}
      className={`${buttonStyle === 'button-standard' ? 'button-standard' : 'button-text'} button-with-icon`}
    >
      <img
        src={googleLogo}
        alt="Google logo"
        className="h-4 w-4"
      />
      Use Google account
    </button>
  );
};

interface UseGoogleAuthButtonProps {
  buttonStyle?: 'button-standard' | 'button-text',
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  setShowErrorMessage: React.Dispatch<React.SetStateAction<boolean>>,
};
