import Button from "@/app/components/button";

export default function CheckButton({
  onPress,
  disabled,
}: {
  onPress?: () => void;
  disabled?: boolean;
}) {
  return (
    <Button
      title="Tarkista"
      color="white"
      disabled={disabled}
      backgroundColor="#93c5fd" // blue 300
      borderColor="#292524" // stone 800
      onPress={onPress || (() => {})}
    />
  );
}
