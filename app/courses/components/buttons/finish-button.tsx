import Button from "@/app/components/button";

export default function FinishButton({
  onPress,
  disabled,
}: {
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Button
      title="Valmis"
      color="white"
      disabled={disabled}
      backgroundColor="#6366f1"
      borderColor="#3730a3"
      onPress={onPress}
    />
  );
}
