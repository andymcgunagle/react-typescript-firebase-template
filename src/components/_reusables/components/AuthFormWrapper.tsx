export default function AuthFormWrapper({
  children,
  heading,
}: AuthFormWrapperProps) {
  return (
    <div className="flex flex-col gap-2 border-y-4 border-gray-900 py-8 w-full">
      <h2 className="font-semibold text-xl text-center">
        {heading}
      </h2>
      {children}
    </div>
  );
};

interface AuthFormWrapperProps {
  children: JSX.Element | JSX.Element[],
  heading: string,
};