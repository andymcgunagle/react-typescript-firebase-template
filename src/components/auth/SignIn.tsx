import React, { useState } from "react";

import { useTypedDispatch } from "../../redux/store";
import { setUid } from "../../redux/authSlice";

import { firebaseAuth } from '../../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

import {
  getButtonStyles,
  getFormStyles,
  getHeadingStyles,
  getInputStyles,
} from "../_reusables/styles";

export default function SignIn() {
  const dispatch = useTypedDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === '' || password === '') return;

    try {
      const credential = await signInWithEmailAndPassword(firebaseAuth, email, password);
      dispatch(setUid({ uid: credential.user.uid }));
    } catch (error: any) {
      console.error(error.message);
    };
  };

  return (
    <div className="animate-fadeIn flex flex-col items-center gap-4 w-full max-w-sm">
      <h2 className={getHeadingStyles({ headingStyle: 'h2' })}>
        Sign In
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
        <button
          type="submit"
          className={getButtonStyles({ buttonStyle: 'outlined' })}
        >
          Submit
        </button>
      </form>
    </div>
  );
};