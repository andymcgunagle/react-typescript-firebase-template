import { Link } from "react-router-dom";

import AppName from "./_reusables/components/AppName";
import SignOut from "./auth/SignOut";
import { getPillStyles } from "./_reusables/styles/getPillStyles";

export default function MainNavPage() {
  return (
    <nav className="absolute left-0 right-0 z-40">
      <ul className="flex flex-col justify-center items-center gap-12 h-[calc(100vh-2rem)] pb-16 text-2xl font-semibold overflow-auto">
        <li>
          <AppName />
        </li>
        <li className={getPillStyles({ pillStyle: 'standard' })}>
          <Link
            to={`/test`}
          >
            🙂 Here's a link
          </Link>
        </li>
        <li className={getPillStyles({ pillStyle: 'standard' })}>
          <SignOut />
        </li>
      </ul>
    </nav>
  );
};