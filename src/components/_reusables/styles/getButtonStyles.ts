export function getButtonStyles({
  additionalStyles,
  buttonStyle,
}: GetButtonStylesProps) {
  const baseStyles = 'px-2 py-1 rounded-[.25rem] w-fit hover:-translate-y-[0.125rem] active:translate-y-0';

  let styles;

  switch (buttonStyle) {
    case 'outlined':
      styles = `${baseStyles} border-2 border-gray-900 text-gray-900 shadow-md`;
      break;
    case 'standard':
      styles = `${baseStyles} bg-gray-900 text-gray-50 shadow-md`;
      break;
    case 'standard-with-icon':
      styles = `${baseStyles} bg-gray-900 text-gray-50 shadow-md flex gap-2 items-center`;
      break;
    case 'text':
      styles = `${baseStyles} text-gray-900`;
      break;
    case 'text-and-icon':
      styles = `${baseStyles} flex gap-2 items-center`;
      break;
    default:
      throw new Error('Must specify button style.');
  };

  if (additionalStyles) styles = `${styles} ${additionalStyles}`;

  return styles;
};

interface GetButtonStylesProps {
  additionalStyles?: string,
  buttonStyle: 'outlined' | 'standard' | 'standard-with-icon' | 'text' | 'text-and-icon',
};
