import { useState } from "react";

import Button from "../_reusables/Button";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function AuthPage() {
  const [showSignIn, setShowSignIn] = useState(true);

  return (
    <div className="flex flex-col items-center gap-4">
      {showSignIn ? <SignIn /> : <SignUp />}
      <Button
        buttonStyle="text"
        onClick={() => setShowSignIn(!showSignIn)}
      >
        {showSignIn ?
          'New here? Click here to create an account'
          : 'Already have an account? Click here to log in'
        }
      </Button>
    </div>
  );
};