export function getFormStyles({
  additionalStyles,
  formStyle,
}: HeadingStyleProps) {
  let styles;

  switch (formStyle) {
    case 'standard':
      styles = 'flex flex-col items-center gap-4 w-full max-w-sm m-auto';
      break;
    default:
      throw new Error('Must specify a formStyle.');
  };

  if (additionalStyles) styles = `${styles} ${additionalStyles}`;

  return styles;
};

type FormStyle = 'standard';

interface HeadingStyleProps {
  additionalStyles?: string,
  formStyle: FormStyle,
};