export function getInputStyles({
  additionalStyles,
  inputStyle,
}: HeadingStyleProps) {
  let styles;

  switch (inputStyle) {
    case 'standard':
      styles = `border-b-2 border-gray-900 p-2 w-full`;
      break;
    default:
      throw new Error('Must specify a inputStyle.');
  };

  if (additionalStyles) styles = `${styles} ${additionalStyles}`;

  return styles;
};

type InputStyle = 'standard';

interface HeadingStyleProps {
  additionalStyles?: string,
  inputStyle: InputStyle,
};