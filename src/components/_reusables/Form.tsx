export default function Form({
  additionalStyles,
  children,
  onSubmit
}: FormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className={`flex flex-col items-center gap-4 w-full ${additionalStyles}`}
    >
      {children}
    </form>
  );
};

interface FormProps {
  additionalStyles?: string,
  children: JSX.Element | JSX.Element[],
  onSubmit: React.FormEventHandler<HTMLFormElement>,
};