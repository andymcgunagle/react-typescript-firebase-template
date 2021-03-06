import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

import { Routes, Route } from "react-router-dom";

import useSetUser from "./hooks/useSetUser";

import FixedMenuButton from "./components/_reusables/components/FixedMenuButton";
import ForgotPassword from "./components/auth/ForgotPassword";
import Loading from "./components/_reusables/components/Loading";
import MainNavPage from "./components/MainNavPage";
import PageNotFound from "./components/_reusables/components/PageNotFound";
import ResetPassword from "./components/auth/ResetPassword";
import SettingsPage from "./components/auth/SettingsPage";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";

export default function App() {
  //state.auth.uid has an initial state of undefined. The useSetUser hook changes state.auth.uid to a uid string if there is a user or null if there is not.
  useSetUser();

  const uid = useSelector((state: RootState) => state.auth.uid);

  if (uid === undefined) return (
    <div className="`flex flex-col h-screen p-4 justify-center items center">
      <Loading />
    </div>
  );

  if (uid === null) return (
    <main className="flex flex-col justify-center items-center p-4 min-h-screen overflow-scroll">
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </main>
  );

  return (
    <main className="p-8 pb-28 min-h-screen overflow-scroll max-w-2xl m-auto relative">
      <Routes>
        <Route path="/" element={<MainNavPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <FixedMenuButton />
    </main>
  );
};
