import { useState } from "react";

import { getButtonStyles } from "../_reusables/styles/getButtonStyles";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function AuthPage() {
  const [showSignIn, setShowSignIn] = useState(true);

  return (
    <div className="flex flex-col items-center gap-4">
      {showSignIn ? <SignIn /> : <SignUp />}
      <button
        onClick={() => setShowSignIn(!showSignIn)}
        className={getButtonStyles({ buttonStyle: 'text' })}
      >
        {showSignIn ?
          'New here? Click here to create an account'
          : 'Already have an account? Click here to log in'
        }
      </button>
    </div>
  );
};