import { View, StyleSheet } from "react-native";
import CorrectAnswerBanner from "./correct-answer-banner";
import WrongAnswerBanner from "./wrong-answer-banner";

export default function Feedback({
  answer,
  xp,
}: {
  answer: "correct" | "wrong" | null;
  xp: number;
}) {
  return (
    <View
      style={{
        transform: [
          {
            translateY:
              answer === "correct" || answer === "wrong" ? "0%" : "100%",
          },
        ],
        ...styles.container,
      }}
    >
      {answer === "correct" ? (
        <CorrectAnswerBanner xp={xp} />
      ) : (
        <WrongAnswerBanner />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
  },
});
