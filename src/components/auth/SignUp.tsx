import React, { useState } from "react";

import { useTypedDispatch } from "../../redux/store";
import { setUid } from "../../redux/authSlice";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth, firestoreDB } from '../../firebase';
import { doc, setDoc } from "firebase/firestore";

import { useNavigate, useParams } from "react-router-dom";

import AppName from "../_reusables/components/AppName";
import AuthFormWrapper from "../_reusables/components/AuthFormWrapper";
import UseGoogleAuthButton from "./UseGoogleAuthButton";
import HorizontalRuleWithText from "../_reusables/components/HorizontalRuleWithText";
import LabelInputWrapper from "../_reusables/components/LabelInputWrapper";
import AuthPageWithErrorMessage from "./AuthWrapperWithErrorMessage";

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
    <AuthPageWithErrorMessage
      errorMessage={errorMessage}
      setShowErrorMessage={setShowErrorMessage}
      showErrorMessage={showErrorMessage}
    >
      <AppName />
      <AuthFormWrapper heading="Sign up with one click...">
        <UseGoogleAuthButton
          setErrorMessage={setErrorMessage}
          setShowErrorMessage={setShowErrorMessage}
        />
        <HorizontalRuleWithText text="OR" />
        <form
          onSubmit={submitForm}
          className="form-standard"
        >
          <LabelInputWrapper labelText="First Name">
            <input
              autoFocus
              autoCapitalize="word"
              onChange={e => setFirstName(e.target.value)}
              placeholder="First name"
              type="text"
              value={firstName}
              className="input-standard"
            />
          </LabelInputWrapper>
          <LabelInputWrapper labelText="Email">
            <input
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              value={email}
              className="input-standard"
            />
          </LabelInputWrapper>
          <LabelInputWrapper labelText="Password">
            <input
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              value={password}
              className="input-standard"
            />
          </LabelInputWrapper>
          <LabelInputWrapper labelText="Confirm Password">
            <input
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              type="password"
              value={confirmPassword}
              className="input-standard"
            />
          </LabelInputWrapper>
          <button
            type="submit"
            className="button-standard"
          >
            Sign up
          </button>
        </form>
      </AuthFormWrapper>
      <button
        onClick={() => navigate({ pathname: '/sign-in' })}
        type="button"
        className="button-text button-with-icon"
      >
        <span className="material-icons icon-sm icon-gray">person</span>
        <span>Already have an account?</span>
      </button>
    </AuthPageWithErrorMessage>
  );
};
