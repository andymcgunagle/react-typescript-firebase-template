import { useState } from "react";

import { sendPasswordResetEmail } from "firebase/auth";
import { firebaseAuth } from "../../firebase";

import { useNavigate } from "react-router-dom";

import AppName from "../_reusables/components/AppName";
import AuthFormWrapper from "../_reusables/components/AuthFormWrapper";
import Confirmation from "../_reusables/components/Confirmation";
import AuthWrapperWithErrorMessage from "./AuthWrapperWithErrorMessage";

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
    <AuthWrapperWithErrorMessage
      errorMessage={errorMessage}
      setShowErrorMessage={setShowErrorMessage}
      showErrorMessage={showErrorMessage}
    >
      <AppName />
      <AuthFormWrapper heading="Which email should we send a reset password link to?">
        <form
          onSubmit={triggerPasswordResetEmail}
          className="form-standard"
        >
          <input
            autoFocus
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            value={email}
            className="input-standard"
          />
          <button
            type="submit"
            className="button-standard"
          >
            Send email
          </button>
        </form>
      </AuthFormWrapper>
      <button
        onClick={() => navigate({ pathname: '/sign-in' })}
        className="button-text button-with-icon"
      >
        <span className="material-icons icon-gray icon-sm">
          arrow_back
        </span>
        Back to sign in
      </button>
      <Confirmation
        emoji="????"
        secondsVisible={5}
        setShowConfirmation={setShowConfirmation}
        showConfirmation={showConfirmation}
        text="Password reset email sent! Please check your email."
      />
    </AuthWrapperWithErrorMessage>
  );
};