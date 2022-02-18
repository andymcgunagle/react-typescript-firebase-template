import { useEffect } from "react";

export default function Confirmation({
  emoji,
  secondsVisible,
  setShowConfirmation,
  showConfirmation,
  text,
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
          <div className="flex gap-2 items-center">
            <span className="flex justify-center items-center text-sm h-8 w-8 p-2 rounded-full bg-green-700">
              {emoji}
            </span>
            <span>{text}</span>
          </div>
        </div>
        : null}
    </>
  );
};

interface ConfirmationProps {
  emoji: string,
  secondsVisible: number,
  setShowConfirmation: React.Dispatch<React.SetStateAction<boolean>>,
  showConfirmation: boolean,
  text: string,
};