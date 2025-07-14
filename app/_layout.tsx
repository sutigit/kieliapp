import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fefefe",
        },
        headerTintColor: "#333",
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="courses" />
    </Stack>
  );
}
