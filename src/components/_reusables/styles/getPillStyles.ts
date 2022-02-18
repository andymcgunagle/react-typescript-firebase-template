export function getPillStyles({
  additionalStyles,
  pillStyle,
}: GetPillStyleProps) {
  const baseStyles = 'rounded-full w-fit';

  let styles;

  switch (pillStyle) {
    case 'standard':
      styles = `${baseStyles} px-4 py-2 bg-white shadow-md`;
      break;
    default:
      throw new Error('Must specify pillStyle.');
  };

  if (additionalStyles) styles = `${styles} ${additionalStyles}`;

  return styles;
};

interface GetPillStyleProps {
  additionalStyles?: string,
  pillStyle: 'standard',
};