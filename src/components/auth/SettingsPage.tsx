import DeleteAccountButton from "./DeleteAccountButton";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="heading-h1">
        Settings
      </h1>
      <DeleteAccountButton />
    </div>
  );
};