import { View, StyleSheet, Text } from "react-native";
import Button from "@/app/components/button";
import Icons from "@expo/vector-icons/Ionicons";

export default function WrongAnswerBanner() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>❌ Väärä vastaus</Text>
      </View>
      <View style={styles.buttons}>
        <Button title="Yritä uudestaan" onPress={() => {}} />
        <Button title="Jatka" onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 25,
    width: "100%",
    padding: 30,
    backgroundColor: "lightcoral",
  },
  content: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
  },
});
