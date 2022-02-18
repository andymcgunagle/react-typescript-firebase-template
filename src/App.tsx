import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

import { Routes, Route } from "react-router-dom";

import useSetUser from "./hooks/useSetUser";

import AppWrapper from "./components/_reusables/components/AppWrapper";
import ForgotPassword from "./components/auth/ForgotPassword";
import Loading from "./components/_reusables/components/Loading";
import ResetPassword from "./components/auth/ResetPassword";
import SignIn from "./components/auth/SignIn";
import SignOut from "./components/auth/SignOut";
import SignUp from "./components/auth/SignUp";

export default function App() {
  //state.auth.uid has an initial state of undefined. The useSetUser hook changes state.auth.uid to a uid string if there is a user or null if there is not.
  useSetUser();

  const uid = useSelector((state: RootState) => state.auth.uid);

  if (uid === undefined) return (
    <AppWrapper additionalStyles="justify-center items center">
      <Loading />
    </AppWrapper>
  );

  if (uid === null) return (
    <div className="flex flex-col justify-center items-center p-4 min-h-screen overflow-scroll">
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile/:matchId" element={<SignUp />} />
      </Routes>
    </div>
  );

  return (
    <AppWrapper>
      <SignOut />
      <Routes>
        <Route path="/" element={<h1>Hello, world!</h1>} />
      </Routes>
    </AppWrapper>
  );
};
