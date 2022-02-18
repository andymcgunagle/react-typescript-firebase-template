import { getHeadingStyles } from "../styles";

export default function AppName() {
  return (
    <h1 className={getHeadingStyles({
      headingStyle: 'h1',
      additionalStyles: 'flex flex-col items-center gap-2 text-center text-gray-900',
    })}>
      <span className="material-icons flex justify-center items-center text-3xl h-12 w-12 rounded-full bg-gray-200 text-gray-900">
        question_mark
      </span>
      <span>
        AppNameHere
      </span>
    </h1>
  );
};