export default function Heading({
  additionalStyles,
  children,
  headingType = 'h2',
}: HeadingProps) {
  const CustomTag = headingType;
  let styleString;

  switch (headingType) {
    case 'h1':
      styleString = `text-4xl`;
      break;
    case 'h2':
      styleString = `text-3xl`;
      break;
    case 'h3':
      styleString = `text-2xl`;
      break;
    case 'h4':
      styleString = `text-xl`;
      break;
    case 'h5':
      styleString = `text-lg`;
      break;
    case 'h6':
      styleString = `text-base`;
      break;
    default:
      throw new Error('Must specify a headingType.');
  };

  return (
    <CustomTag
      className={`${styleString} ${additionalStyles}`}
    >
      {children}
    </CustomTag>
  );
};

interface HeadingProps {
  additionalStyles?: string,
  children: string,
  headingType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
}
