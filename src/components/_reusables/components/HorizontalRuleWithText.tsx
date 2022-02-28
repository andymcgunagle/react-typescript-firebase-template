export default function HorizontalRuleWithText({ text }: HorizontalRuleWithTextProps) {
  return (
    <div className="flex gap-2 justify-center items-center w-full">
      <div className="border-b-2 border-gray-300 w-full"></div>
      <span className="text-sm text-gray-400">
        {text}
      </span>
      <div className="border-b-2 border-gray-300 w-full"></div>
    </div>
  );
};

interface HorizontalRuleWithTextProps {
  text: string,
};
