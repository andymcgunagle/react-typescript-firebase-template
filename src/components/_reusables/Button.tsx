export default function Button({
  additionalStyles,
  buttonStyle,
  children,
  onClick,
  type = 'button',
}: ButtonProps) {
  const baseStyles = 'px-2 py-1 rounded-[.25rem] w-fit hover:-translate-y-[0.125rem] active:translate-y-0';

  let styleString;

  switch (buttonStyle) {
    case 'noBaseStyles':
      styleString = '';
      break;
    case 'outlined':
      styleString = `${baseStyles} border-2 border-gray-900 text-gray-900 shadow-md`;
      break;
    case 'text':
      styleString = `${baseStyles} text-gray-900`;
      break;
    default:
      styleString = `${baseStyles} bg-gray-900 text-gray-50 shadow-md`;
      break;
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${styleString} ${additionalStyles}`}
    >
      {children}
    </button>
  );
};

interface ButtonProps {
  additionalStyles?: string,
  buttonStyle?: 'noBaseStyles' | 'outlined' | 'text',
  children: string | JSX.Element | JSX.Element[],
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  type?: 'button' | 'submit' | 'reset',
};
