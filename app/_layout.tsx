import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="screens/onboarding/Welcome" />
      <Stack.Screen name="screens/onboarding/InitialLogin" />
      <Stack.Screen name="screens/main/Login" />
      <Stack.Screen name="screens/main/Register" />
      <Stack.Screen name="screens/main/Menu" />
      <Stack.Screen name="screens/main/Order" />
      <Stack.Screen name="screens/main/Cart" />
      <Stack.Screen name="screens/main/Checkout" />
      <Stack.Screen name="screens/Main" />
    </Stack>
  );
}
