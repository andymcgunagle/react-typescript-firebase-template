import React, { useState } from "react";

import { useTypedDispatch } from "../../redux/store";
import { setUid } from "../../redux/authSlice";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from '../../firebase';

import {
  getButtonStyles,
  getFormStyles,
  getHeadingStyles,
  getInputStyles,
} from "../_reusables/styles";

export default function SignUp() {
  const dispatch = useTypedDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === '' || password === '' || confirmPassword === '') return;
    if (password !== confirmPassword) return;

    try {
      const credential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      dispatch(setUid({ uid: credential.user.uid }));
    } catch (error: any) {
      console.error(error.message);
    };
  };

  return (
    <div className="animate-fadeIn flex flex-col items-center gap-4 w-full max-w-sm">
      <h2 className={getHeadingStyles({ headingStyle: 'h2' })}>
        Sign Up
      </h2>

      <form
        onSubmit={submitForm}
        className={getFormStyles({ formStyle: 'standard' })}
      >
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
  );
};