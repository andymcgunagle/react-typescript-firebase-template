import { useNavigate } from "react-router-dom";
import AppName from "./AppName";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center gap-8 h-[calc(100vh-10rem)]">
      <AppName />
      <p>
        Oh no! Page not found.
      </p>
      <button
        onClick={() => navigate({ pathname: '/' })}
        className="button-standard button-with-icon"
      >
        <span className="material-icons">
          arrow_back
        </span>
        <span>Home</span>
      </button>
    </div>
  );
};