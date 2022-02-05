import React, { useState } from "react";

import { useTypedDispatch } from "../../redux/store";
import { setUid } from "../../redux/authSlice";

import { firebaseAuth } from '../../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

import Button from "../_reusables/Button";
import Form from "../_reusables/Form";
import Heading from "../_reusables/Heading";
import Input from "../_reusables/Input";

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
    <div className="flex flex-col items-center gap-4 w-full max-w-sm">
      <Heading>
        Sign In
      </Heading>
      <Form
        onSubmit={submitForm}
      >
        <Input
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          value={email}
        />
        <Input
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          value={password}
        />
        <Button type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};