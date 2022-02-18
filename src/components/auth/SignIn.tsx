import React, { useState } from "react";

import { useTypedDispatch } from "../../redux/store";
import { setUid } from "../../redux/authSlice";

import { firebaseAuth } from '../../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

import { useNavigate, useParams } from "react-router-dom";

import ErrorMessage from "../_reusables/components/ErrorMessage";
import {
  getButtonStyles,
  getFormStyles,
  getInputStyles,
} from "../_reusables/styles";
import AppName from "../_reusables/components/AppName";

export default function SignIn() {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  let { matchId } = useParams();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === '' || password === '') {
      setErrorMessage('Please fill out all fields');
      setShowErrorMessage(true);
      return;
    };

    try {
      const credential = await signInWithEmailAndPassword(firebaseAuth, email, password);

      dispatch(setUid(credential.user.uid));

      if (!matchId) navigate({ pathname: '/' });

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
      <div className="flex flex-col gap-2 border-y-4 border-gray-900 py-8 w-full">
        <h2 className="font-semibold text-xl text-center">
          Welcome back!
        </h2>
        <form
          onSubmit={submitForm}
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
          <input
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            value={password}
            className={getInputStyles({ inputStyle: 'standard' })}
          />
          <button
            type="submit"
            className={getButtonStyles({ buttonStyle: 'standard' })}
          >
            Submit
          </button>
        </form>
      </div>
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={() => navigate({ pathname: '/' })}
          type="button"
          className={getButtonStyles({
            buttonStyle: 'text',
            additionalStyles: 'flex flex-wrap justify-center items-center gap-1',
          })}
        >
          <span>New here? </span>
          <span>Click here to create an account.</span>
        </button>
        <button
          onClick={() => navigate({ pathname: '/forgot-password' })}
          type="button"
          className={getButtonStyles({
            buttonStyle: 'text',
            additionalStyles: 'flex flex-wrap justify-center items-center gap-1',
          })}
        >
          Forgot your password?
        </button>
      </div>
      <ErrorMessage
        message={errorMessage}
        setShowErrorMessage={setShowErrorMessage}
        showErrorMessage={showErrorMessage}
      />
    </div>
  );
};
