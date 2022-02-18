import { useEffect } from "react";

export default function Confirmation({
  children,
  secondsVisible,
  setShowConfirmation,
  showConfirmation,
}: ConfirmationProps) {

  useEffect(() => {
    const timer = setTimeout(() => { setShowConfirmation(false); }, (1000 * secondsVisible));
    return () => clearTimeout(timer);
  }, [secondsVisible, setShowConfirmation, showConfirmation]);

  return (
    <>
      {showConfirmation ?
        <div
          onClick={() => setShowConfirmation(!showConfirmation)}
          className="absolute top-4 flex flex-col gap-4 p-4 max-w-[80%] text-sm font-light bg-green-100 border-2 border-green-900 rounded-md cursor-pointer animate-notification"
        >
          {children}
        </div>
        : null}
    </>
  );
};

interface ConfirmationProps {
  children: JSX.Element | JSX.Element[],
  secondsVisible: number,
  setShowConfirmation: React.Dispatch<React.SetStateAction<boolean>>,
  showConfirmation: boolean,
};