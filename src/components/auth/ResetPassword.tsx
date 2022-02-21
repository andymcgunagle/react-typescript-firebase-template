import { useState } from "react";

import { firebaseAuth } from "../../firebase";

import { useNavigate, useSearchParams } from "react-router-dom";

import { handleResetPassword } from "../../functions/handleResetPassword";

import AppName from "../_reusables/components/AppName";
import AuthFormWrapper from "../_reusables/components/AuthFormWrapper";
import Confirmation from "../_reusables/components/Confirmation";
import ErrorMessage from "../_reusables/components/ErrorMessage";

export default function ResetPassword() {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password === '' || confirmPassword === '') {
      setErrorMessage('Please fill out both fields');
      setShowErrorMessage(true);
      return;
    };

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      setShowErrorMessage(true);
      return;
    };

    try {
      const actionCode = searchParams.get('oobCode');

      // If using a custom domain, be sure to add it to your Authorized domains in Firebase: Authentication > Sign-in method > Add domain

      if (actionCode) {
        handleResetPassword({
          auth: firebaseAuth,
          actionCode,
          newPassword: password,
        });

        setShowConfirmation(true);

        setTimeout(() => navigate({ pathname: '/sign-in' }), (1000 * 4));
      };
    } catch (error: any) {
      if (error.message) {
        setErrorMessage(error.message);
        setShowErrorMessage(true);
      };
      console.error(error);
    };
  };

  return (
    <div className="animate-fadeIn flex flex-col items-center gap-4 w-full max-w-md">
      <AppName />
      <AuthFormWrapper heading="Create a new password">
        <form
          onSubmit={submitForm}
          className="form-standard"
        >
          <input
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            value={password}
            className="input-standard"
          />
          <input
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            type="password"
            value={confirmPassword}
            className="input-standard"
          />
          <button
            type="submit"
            className="button-standard"
          >
            Reset password
          </button>
        </form>
      </AuthFormWrapper>
      <Confirmation
        emoji="👍"
        secondsVisible={3}
        setShowConfirmation={setShowConfirmation}
        showConfirmation={showConfirmation}
        text="Password reset! Redirecting you to the login page."
      />
      <ErrorMessage
        message={errorMessage}
        setShowErrorMessage={setShowErrorMessage}
        showErrorMessage={showErrorMessage}
      />
    </div>
  );
};