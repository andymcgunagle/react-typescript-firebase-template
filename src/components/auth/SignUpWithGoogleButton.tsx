import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { firebaseAuth, firestoreDB } from "../../firebase";
import { setUid } from "../../redux/authSlice";
import { getButtonStyles } from "../_reusables/styles";
import googleLogo from "../../images/google-logo.svg.png";

export default function SignUpWithGoogleButton({
  setErrorMessage,
  setShowErrorMessage,
}: SignUpWithGoogleButtonProps) {
  const dispatch = useDispatch();

  const signUpWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(firebaseAuth, provider);

      await setDoc(doc(firestoreDB, 'users', result.user.uid, 'settings', 'publicUserInfo'), { firstName: result.user.displayName?.split(' ')[0] });

      dispatch(setUid(result.user.uid));
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
      onClick={signUpWithGoogle}
      className={getButtonStyles({
        buttonStyle: 'standard-with-icon'

      })}
    >
      <img
        src={googleLogo}
        alt="Google logo"
        className="h-4 w-4"
      />
      Sign up with Google
    </button>
  );
};

interface SignUpWithGoogleButtonProps {
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  setShowErrorMessage: React.Dispatch<React.SetStateAction<boolean>>,
};