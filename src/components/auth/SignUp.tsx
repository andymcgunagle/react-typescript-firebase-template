import React, { useState } from "react";

import { useTypedDispatch } from "../../redux/store";
import { setUid } from "../../redux/authSlice";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth, firestoreDB } from '../../firebase';
import { doc, setDoc } from "firebase/firestore";

import { useNavigate, useParams } from "react-router-dom";


import ErrorMessage from "../_reusables/components/ErrorMessage";
import AppName from "../_reusables/components/AppName";
import AuthFormWrapper from "../_reusables/components/AuthFormWrapper";
import SignUpWithGoogleButton from "./SignUpUsingGoogleButton";

export default function SignUp() {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  let { matchId } = useParams();


  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [useEmailAndPassword, setUseEmailAndPassword] = useState(false);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (firstName === '' || email === '' || password === '' || confirmPassword === '') {
      setErrorMessage('Please fill out all fields');
      setShowErrorMessage(true);
      return;
    };

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      setShowErrorMessage(true);
      return;
    };

    try {
      const credential = await createUserWithEmailAndPassword(firebaseAuth, email, password);

      await setDoc(doc(firestoreDB, 'users', credential.user.uid, 'settings', 'publicUserInfo'), { firstName });

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
      <AuthFormWrapper heading="Sign up in less than 30 seconds...">
        {useEmailAndPassword ?
          <>
            <form
              onSubmit={submitForm}
              className="form-standard"
            >
              <input
                autoFocus
                autoCapitalize="word"
                onChange={e => setFirstName(e.target.value)}
                placeholder="First name"
                type="text"
                value={firstName}
                className="input-standard"
              />
              <input
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
                Sign up
              </button>
            </form>
            <button
              onClick={() => setUseEmailAndPassword(!useEmailAndPassword)}
              type="button"
              className="button-text flex flex-wrap justify-center items-center gap-1"
            >
              ...or use your Google account instead.
            </button>
          </>
          :
          <>
            <SignUpWithGoogleButton
              setErrorMessage={setErrorMessage}
              setShowErrorMessage={setShowErrorMessage}
            />
            <button
              onClick={() => setUseEmailAndPassword(!useEmailAndPassword)}
              type="button"
              className="button-text flex flex-wrap justify-center items-center gap-1"
            >
              ...or use an email & password instead.
            </button>
          </>}

      </AuthFormWrapper>
      <button
        onClick={() => navigate({ pathname: '/sign-in' })}
        type="button"
        className="button-text flex flex-wrap justify-center items-center gap-1"
      >
        Already have an account?
      </button>
      <ErrorMessage
        message={errorMessage}
        setShowErrorMessage={setShowErrorMessage}
        showErrorMessage={showErrorMessage}
      />
    </div>
  );
};
