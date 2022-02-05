import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

import { Routes, Route } from "react-router-dom";

import useSetUser from "./hooks/useSetUser";

import AppWrapper from "./components/_reusables/AppWrapper";
import AuthPage from "./components/auth/AuthPage";
import SignOut from "./components/auth/SignOut";
import Loading from "./components/_reusables/Loading";

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
    <AppWrapper additionalStyles="justify-center">
      <AuthPage />
    </AppWrapper>
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
