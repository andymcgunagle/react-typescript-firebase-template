import { useState } from "react";

import { sendPasswordResetEmail } from "firebase/auth";
import { firebaseAuth } from "../../firebase";

import Confirmation from "../_reusables/components/Confirmation";
import ErrorMessage from "../_reusables/components/ErrorMessage";
import { getButtonStyles, getFormStyles, getInputStyles } from "../_reusables/styles";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const triggerPasswordResetEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === '') {
      setErrorMessage('Please fill out all fields');
      setShowErrorMessage(true);
      return;
    };

    try {
      await sendPasswordResetEmail(firebaseAuth, email);
      setShowConfirmation(true);
    } catch (error: any) {
      if (error.message) {
        setErrorMessage(error.message);
        setShowErrorMessage(true);
      };
      console.error(error);
    };
  };

  return (
    <div className="animate-fadeIn flex flex-col items-center gap-4 w-full max-w-sm">
      <button
        onClick={() => navigate({ pathname: '/sign-in' })}
        className="flex gap-2 items-center"
      >
        <span className="material-icons flex justify-center items-center h-8 w-8 p-2 bg-gray-100 rounded-full text-sm">
          arrow_back
        </span>
        Back
      </button>
      <h2 className="font-semibold text-xl text-center">
        Which email should we send a reset password link to?
      </h2>
      <form
        onSubmit={triggerPasswordResetEmail}
        className={getFormStyles({
          formStyle: 'standard',
        })}
      >
        <input
          autoFocus
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          value={email}
          className={getInputStyles({ inputStyle: 'standard' })}
        />
        <button
          type="submit"
          className={getButtonStyles({ buttonStyle: 'standard' })}
        >
          Submit
        </button>
      </form>
      <Confirmation
        emoji="📩"
        secondsVisible={5}
        setShowConfirmation={setShowConfirmation}
        showConfirmation={showConfirmation}
        text="Password reset email sent! Please check your email."
      />
      <ErrorMessage
        message={errorMessage}
        setShowErrorMessage={setShowErrorMessage}
        showErrorMessage={showErrorMessage}
      />
    </div>
  );
};