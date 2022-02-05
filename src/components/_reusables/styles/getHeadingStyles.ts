export function getHeadingStyles({
  additionalStyles,
  headingStyle,
}: HeadingStyleProps) {
  let styles;

  switch (headingStyle) {
    case 'h1':
      styles = `text-4xl`;
      break;
    case 'h2':
      styles = `text-3xl`;
      break;
    case 'h3':
      styles = `text-2xl`;
      break;
    case 'h4':
      styles = `text-xl`;
      break;
    case 'h5':
      styles = `text-lg`;
      break;
    case 'h6':
      styles = `text-base`;
      break;
    default:
      throw new Error('Must specify a headingStyle.');
  };

  if (additionalStyles) styles = `${styles} ${additionalStyles}`;

  return styles;
};

type HeadingStyle = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface HeadingStyleProps {
  additionalStyles?: string,
  headingStyle: HeadingStyle,
};
