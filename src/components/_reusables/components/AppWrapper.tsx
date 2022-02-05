export default function AppWrapper({ additionalStyles, children }: AppWrapperProps) {
  return (
    <div className={`flex flex-col h-screen p-4 ${additionalStyles}`}>
      {children}
    </div>
  );
};

interface AppWrapperProps {
  additionalStyles?: string,
  children: JSX.Element | JSX.Element[],
};