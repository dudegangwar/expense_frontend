import { SummaryCard } from "@/components/SummaryCard";
import { ActionButtons } from "@/features/dashboard/ActionButtons";
import { TransactionList } from "@/features/transactions/TransactionList";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0D12" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.appName}>Xpen</Text>
          <Text style={styles.date}>25 Dec 2025</Text>
        </View>

        <SummaryCard />
        <ActionButtons />
        <TransactionList />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0D12",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    marginTop: 10,
    marginBottom: 20,
  },
  appName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  date: {
    fontSize: 14,
    color: "#A0A0A5",
    marginTop: 4,
  },
});
