export default function Detail({
  detail,
  emoji,
}: DetailProps) {
  return (
    <div className="flex gap-2 items-center">
      <span className="flex justify-center items-center text-sm h-8 w-8 p-2 rounded-full bg-green-700">
        {emoji}
      </span>
      <span>{detail}</span>
    </div>
  );
};

interface DetailProps {
  detail: string,
  emoji: string,
};