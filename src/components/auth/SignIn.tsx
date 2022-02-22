import React, { useState } from "react";

import { useTypedDispatch } from "../../redux/store";
import { setUid } from "../../redux/authSlice";

import { firebaseAuth } from '../../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

import { useNavigate, useParams } from "react-router-dom";

import ErrorMessage from "../_reusables/components/ErrorMessage";
import AppName from "../_reusables/components/AppName";
import AuthFormWrapper from "../_reusables/components/AuthFormWrapper";
import UseGoogleAuthButton from "./UseGoogleAuthButton";

export default function SignIn() {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  let { matchId } = useParams();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [useEmailAndPassword, setUseEmailAndPassword] = useState(false);

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
      <AuthFormWrapper heading="Welcome back! Sign in below...">
        {useEmailAndPassword ?
          <>
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
            <UseGoogleAuthButton
              buttonStyle="button-text"
              setErrorMessage={setErrorMessage}
              setShowErrorMessage={setShowErrorMessage}
            />
          </>
          :
          <>
            <UseGoogleAuthButton
              setErrorMessage={setErrorMessage}
              setShowErrorMessage={setShowErrorMessage}
            />
            <button
              onClick={() => setUseEmailAndPassword(!useEmailAndPassword)}
              type="button"
              className="button-text flex flex-wrap justify-center items-center gap-1"
            >
              <span className="material-icons icon-sm icon-gray">email</span>
              <span>Use email & password</span>
            </button>
          </>
        }
      </AuthFormWrapper>
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={() => navigate({ pathname: '/' })}
          type="button"
          className="button-text button-with-icon"
        >
          <span className="material-icons icon-sm icon-green">play_arrow</span>
          <span>Create an account</span>
        </button>
        <button
          onClick={() => navigate({ pathname: '/forgot-password' })}
          type="button"
          className="button-text button-with-icon"
        >
          <span className="material-icons icon-sm icon-red">question_mark</span>
          <span>Forgot your password?</span>
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
