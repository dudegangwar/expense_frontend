import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router, Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
      retry: 1,
    },
  },
});

export default function RootLayout() {
  const fetchtoken = async () => {
    const token = await SecureStore.getItemAsync("token");
    return token;
  };

  useEffect(() => {
    fetchtoken().then((token) => {
      if (token) {
        router.replace("/(tabs)/dashboard");
      } else {
        router.replace("/");
      }
    });
    // Any global side-effects can be handled here
  }, []);
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }} />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
