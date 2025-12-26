import { SummaryCard } from "@/components/SummaryCard";
import { ActionButtons } from "@/features/dashboard/ActionButtons";
import { TransactionList } from "@/features/transactions/TransactionList";
import api from "@/lib/api/api";
import { useEffect, useState } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function DashboardScreen() {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await api.get("/expenses");
      setTransactions(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };
  const amountSum = transactions.reduce((total, transaction) => total + transaction.amount, 0);


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0D12" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.appName}>Xpen</Text>
          <Text style={styles.date}>{new Date().toLocaleDateString()}</Text>
        </View>

        <SummaryCard amountSum={amountSum} />
        <ActionButtons />
        <TransactionList transactions={transactions} />
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
