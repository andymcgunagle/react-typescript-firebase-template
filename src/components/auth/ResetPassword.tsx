import { useState } from "react";

import { firebaseAuth } from "../../firebase";

import { useNavigate, useSearchParams } from "react-router-dom";

import { handleResetPassword } from "../../functions/handleResetPassword";

import Confirmation from "../_reusables/components/Confirmation";
import Detail from "../_reusables/components/Detail";
import ErrorMessage from "../_reusables/components/ErrorMessage";
import { getButtonStyles, getFormStyles, getInputStyles } from "../_reusables/styles";

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
    <div className="animate-fadeIn flex flex-col items-center gap-4 w-full max-w-sm">
      <h2 className="font-semibold text-xl text-center">
        Create a new password
      </h2>
      <form
        onSubmit={submitForm}
        className={getFormStyles({
          formStyle: 'standard',
        })}
      >
        <input
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          value={password}
          className={getInputStyles({ inputStyle: 'standard' })}
        />
        <input
          onChange={e => setConfirmPassword(e.target.value)}
          placeholder="Confirm password"
          type="password"
          value={confirmPassword}
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
        secondsVisible={3}
        setShowConfirmation={setShowConfirmation}
        showConfirmation={showConfirmation}
      >
        <Detail
          detail="Password reset! Redirecting you to the login page."
          emoji="👍"
        />
      </Confirmation>
      <ErrorMessage
        message={errorMessage}
        setShowErrorMessage={setShowErrorMessage}
        showErrorMessage={showErrorMessage}
      />
    </div>
  );
};