import { TransactionListSkeleton } from "@/components/skeleton/TransactionList";
import { SummaryCard } from "@/components/SummaryCard";
import { useTheme } from "@/context/ThemeContext";
import { ActionButtons } from "@/features/dashboard/ActionButtons";
import { TransactionList } from "@/features/transactions/TransactionList";
import { useTransactionStore } from "@/store/transaction";
import { IExpenses } from "@/types";
import { useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardScreen() {
  const { theme, isDarkMode } = useTheme();
  const { transactions, fetchTransactions, loading, setSelectedRange } =
    useTransactionStore();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [selectedRange, setLocalSelectedRange] = useState("This Month");

  useEffect(() => {
    fetchTransactions({ range: selectedRange });
  }, []);

  const onRangeChange = (range: string) => {
    setLocalSelectedRange(range);
    setSelectedRange(range);
    fetchTransactions({ range });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTransactions({ range: selectedRange });
    setRefreshing(false);
  };
  const amountSum = transactions
    .filter((t: IExpenses) => t.expense_type === "expense")
    .reduce(
      (total: number, transaction: IExpenses) =>
        total + Number(transaction.amount),
      0,
    );
  const incomeSum = transactions
    .filter((t: IExpenses) => t.expense_type === "income")
    .reduce(
      (total: number, transaction: IExpenses) =>
        total + Number(transaction.amount),
      0,
    );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={theme.background}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["grey"]}
            progressBackgroundColor={"white"}
          />
        }
      >
        <View style={styles.header}>
          <Text style={[styles.appName, { color: theme.text }]}>Xpen</Text>
          <Text style={[styles.date, { color: theme.textSecondary }]}>
            {new Date().toLocaleDateString()}
          </Text>
        </View>

        <SummaryCard
          amountSum={amountSum}
          incomeSum={incomeSum}
          selectedRange={selectedRange}
          onRangeChange={(range) => onRangeChange(range)}
        />
        <ActionButtons />
        {loading ? (
          <TransactionListSkeleton />
        ) : (
          <TransactionList showBy="day" transactions={transactions} />
        )}
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
