export function getTextareaStyles({
  additionalStyles,
  textareaStyle,
}: GetTextareaStylesProps) {
  let styles;

  switch (textareaStyle) {
    case 'standard':
      styles = `border-2 border-gray-200 rounded-md p-2 h-24 w-full resize-y`;
      break;
    default:
      throw new Error('Must specify textareaStyle.');
  };

  if (additionalStyles) styles = `${styles} ${additionalStyles}`;

  return styles;
};

interface GetTextareaStylesProps {
  additionalStyles?: string,
  textareaStyle: 'standard',
};