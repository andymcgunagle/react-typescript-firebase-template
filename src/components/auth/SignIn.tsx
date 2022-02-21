import React, { useState } from "react";

import { useTypedDispatch } from "../../redux/store";
import { setUid } from "../../redux/authSlice";

import { firebaseAuth } from '../../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

import { useNavigate, useParams } from "react-router-dom";

import ErrorMessage from "../_reusables/components/ErrorMessage";
import AppName from "../_reusables/components/AppName";
import AuthFormWrapper from "../_reusables/components/AuthFormWrapper";

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
      <AuthFormWrapper heading="Welcome back!">
        <form
          onSubmit={submitForm}
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
          <input
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            value={password}
            className="input-standard"
          />
          <button
            type="submit"
            className="button-standard"
          >
            Sign in
          </button>
        </form>
      </AuthFormWrapper>
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={() => navigate({ pathname: '/' })}
          type="button"
          className="button-text button-with-icon"
        >
          Create an account
        </button>
        <button
          onClick={() => navigate({ pathname: '/forgot-password' })}
          type="button"
          className="button-text button-with-icon"
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
