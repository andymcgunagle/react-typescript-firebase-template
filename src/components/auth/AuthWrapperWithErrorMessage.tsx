import ErrorMessage from "../_reusables/components/ErrorMessage";

export default function AuthWrapperWithErrorMessage({
  children,
  errorMessage,
  setShowErrorMessage,
  showErrorMessage,
}: AuthWrapperWithErrorMessageProps) {
  return (
    <div className="animate-fadeIn flex flex-col items-center gap-4 w-full max-w-md py-8 rounded-xl bg-white shadow-2xl">
      <div className="flex flex-col items-center gap-4 w-[85%]">
        {children}
      </div>
      <ErrorMessage
        message={errorMessage}
        setShowErrorMessage={setShowErrorMessage}
        showErrorMessage={showErrorMessage}
      />
    </div>
  );
};

interface AuthWrapperWithErrorMessageProps {
  children: JSX.Element | JSX.Element[],
  errorMessage: string,
  setShowErrorMessage: React.Dispatch<React.SetStateAction<boolean>>,
  showErrorMessage: boolean,
};
