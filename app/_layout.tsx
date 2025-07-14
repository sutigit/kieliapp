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
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="courses/index" options={{ headerShown: false }} />
      <Stack.Screen name="courses/[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
