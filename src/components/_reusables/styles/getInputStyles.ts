export function getInputStyles({
  additionalStyles,
  inputStyle,
}: GetInputStylesProps) {
  let styles;

  switch (inputStyle) {
    case 'standard':
      styles = `border-b-2 border-gray-900 p-2 w-full shadow-inner`;
      break;
    default:
      throw new Error('Must specify a inputStyle.');
  };

  if (additionalStyles) styles = `${styles} ${additionalStyles}`;

  return styles;
};

interface GetInputStylesProps {
  additionalStyles?: string,
  inputStyle: 'standard',
};