export default function Input({
  additionalStyles,
  inputStyle,
  onChange,
  placeholder,
  type = 'text',
  value,
}: InputProps) {
  let styleString;

  switch (inputStyle) {
    // case 'outlined':
    //   styleString = `${baseStyles} border-2 border-gray-900 text-gray-900`;
    //   break;
    default:
      styleString = `border-b-2 border-gray-900 p-2 w-full`;
      break;
  };

  return (
    <input
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      value={value}
      className={`${styleString} ${additionalStyles}`}
    />
  );
};

interface InputProps {
  additionalStyles?: string,
  inputStyle?: string,
  onChange: React.ChangeEventHandler<HTMLInputElement>,
  placeholder?: string,
  type?: React.HTMLInputTypeAttribute,
  value: string | number | readonly string[] | undefined,
};