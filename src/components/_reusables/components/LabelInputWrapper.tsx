export default function LabelInputWrapper({
  labelText,
  children,
}: LabelInputWrapperProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm text font-semibold">
        {labelText}
      </label>
      {children}
    </div>
  );
};

interface LabelInputWrapperProps {
  labelText: string,
  children: JSX.Element,
};