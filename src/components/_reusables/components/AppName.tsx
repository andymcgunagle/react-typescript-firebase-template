import { getHeadingStyles, getIconStyles } from "../styles";

export default function AppName() {
  return (
    <h1 className={getHeadingStyles({
      headingStyle: 'h1',
      additionalStyles: 'flex flex-col items-center gap-2 text-center text-gray-900',
    })}>
      <span className={getIconStyles({ iconStyle: 'large-gray' })}>
        question_mark
      </span>
      <span>
        AppNameHere
      </span>
    </h1>
  );
};