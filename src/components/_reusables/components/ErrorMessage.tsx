import { useEffect } from "react";

export default function ErrorMessage({
  message,
  setShowErrorMessage,
  showErrorMessage,
}: ConfirmationProps) {

  useEffect(() => {
    const timer = setTimeout(() => { setShowErrorMessage(false); }, (1000 * 5));
    return () => clearTimeout(timer);
  }, [setShowErrorMessage, showErrorMessage]);

  function formatFirebaseErrorMessage(message: string) {
    return message.includes('Firebase:') ? message.split('Firebase:')[1] : message;
  };

  return (
    <>
      {showErrorMessage ?
        <div
          onClick={() => setShowErrorMessage(!showErrorMessage)}
          className="absolute top-4 flex items-center gap-2 p-4 max-w-[80%] text-sm font-light bg-red-100 border-2 border-red-900 rounded-md cursor-pointer animate-notification"
        >
          <span className="material-icons text-2xl text-red-700">
            error
          </span>
          <span>{formatFirebaseErrorMessage(message)}</span>
        </div>
        : null}
    </>
  );
};

interface ConfirmationProps {
  message: string,
  setShowErrorMessage: React.Dispatch<React.SetStateAction<boolean>>,
  showErrorMessage: boolean,
};