import React, { useState } from "react";

import { useTypedDispatch } from "../../redux/store";
import { setUid } from "../../redux/authSlice";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth, firestoreDB } from '../../firebase';
import { doc, setDoc } from "firebase/firestore";

import { useNavigate, useParams } from "react-router-dom";

import ErrorMessage from "../_reusables/components/ErrorMessage";
import {
  getButtonStyles,
  getFormStyles,
  getInputStyles,
} from "../_reusables/styles";
import AppName from "../_reusables/components/AppName";

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
      <div className="flex flex-col gap-2 border-y-4 border-gray-900 py-8 w-full">
        <h2 className="font-semibold text-xl text-center">
          Sign up in just 30 seconds...
        </h2>
        <form
          onSubmit={submitForm}
          className={getFormStyles({
            formStyle: 'standard',
          })}
        >
          <input
            autoFocus
            autoCapitalize="word"
            onChange={e => setFirstName(e.target.value)}
            placeholder="First name"
            type="text"
            value={firstName}
            className={getInputStyles({ inputStyle: 'standard' })}
          />
          <input
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
      </div>
      <button
        onClick={() => navigate({ pathname: '/sign-in' })}
        type="button"
        className={getButtonStyles({
          buttonStyle: 'text',
          additionalStyles: 'flex flex-wrap justify-center items-center gap-1',
        })}
      >
        <span>Already have an account? </span>
        <span>Click here to log in.</span>
      </button>
      <ErrorMessage
        message={errorMessage}
        setShowErrorMessage={setShowErrorMessage}
        showErrorMessage={showErrorMessage}
      />
    </div>
  );
};