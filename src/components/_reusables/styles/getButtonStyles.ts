export function getButtonStyles({
  additionalStyles,
  buttonStyle,
}: GetButtonStylesProps) {
  const baseStyles = 'px-2 py-1 rounded-[.25rem] w-fit hover:-translate-y-[0.125rem] active:translate-y-0 active:shadow-';

  let styles;

  switch (buttonStyle) {
    case 'outlined':
      styles = `${baseStyles} border-2 border-gray-900 text-gray-900 shadow-md`;
      break;
    case 'standard':
      styles = `${baseStyles} bg-gray-900 text-gray-50 shadow-md`;
      break;
    case 'text':
      styles = `${baseStyles} text-gray-900`;
      break;
    default:
      throw new Error('Must specify button style.');
  };

  if (additionalStyles) styles = `${styles} ${additionalStyles}`;

  return styles;
};

interface GetButtonStylesProps {
  additionalStyles?: string,
  buttonStyle: 'outlined' | 'standard' | 'text',
};
