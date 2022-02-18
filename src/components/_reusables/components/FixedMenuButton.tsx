import { useLocation, useNavigate } from "react-router-dom";

export default function FixedMenuButton() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <button
      onClick={() => navigate('/')}
      className={pathname === '/' ? "hidden" : "bg-gray-900 text-gray-50 absolute bottom-4 right-4 h-16 w-16 rounded-full z-50"}
    >
      <span className="material-icons flex justify-center items-center text-4xl">
        menu
      </span>
    </button>
  );
};