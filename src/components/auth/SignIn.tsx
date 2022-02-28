import React, { useState } from "react";

import { useTypedDispatch } from "../../redux/store";
import { setUid } from "../../redux/authSlice";

import { firebaseAuth } from '../../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

import { useNavigate, useParams } from "react-router-dom";

import AppName from "../_reusables/components/AppName";
import AuthFormWrapper from "../_reusables/components/AuthFormWrapper";
import UseGoogleAuthButton from "./UseGoogleAuthButton";
import HorizontalRuleWithText from "../_reusables/components/HorizontalRuleWithText";
import LabelInputWrapper from "../_reusables/components/LabelInputWrapper";
import AuthPageWithErrorMessage from "./AuthWrapperWithErrorMessage";

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
    <AuthPageWithErrorMessage
      errorMessage={errorMessage}
      setShowErrorMessage={setShowErrorMessage}
      showErrorMessage={showErrorMessage}
    >
      <AppName />
      <AuthFormWrapper heading="Welcome back! Sign in below...">
        <UseGoogleAuthButton
          setErrorMessage={setErrorMessage}
          setShowErrorMessage={setShowErrorMessage}
        />
        <HorizontalRuleWithText text="OR" />
        <form
          onSubmit={submitForm}
          className="form-standard"
        >
          <LabelInputWrapper labelText="Email">
            <input
              autoFocus
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
    </AuthPageWithErrorMessage>
  );
};
