export function getIconStyles({
  additionalStyles,
  iconStyle,
}: GetIconStylesProps) {
  let styles;
  const baseStyles = "material-icons flex justify-center items-center h-8 w-8 p-2 rounded-full text-sm";

  switch (iconStyle) {
    case 'gray':
      styles = `${baseStyles} bg-gray-100 text-gray-900`;
      break;
    case 'green':
      styles = `${baseStyles} bg-green-100 text-green-900`;
      break;
    case 'large-gray':
      styles = `material-icons flex justify-center items-center text-3xl h-12 w-12 p-2 rounded-full bg-gray-200 text-gray-900`;
      break;
    case 'red':
      styles = `${baseStyles} bg-red-100 text-red-900`;
      break;
    default:
      throw new Error('Must specify a iconStyle.');
  };

  if (additionalStyles) styles = `${styles} ${additionalStyles}`;

  return styles;
};

interface GetIconStylesProps {
  additionalStyles?: string,
  iconStyle: 'gray' | 'green' | 'large-gray' | 'red',
};