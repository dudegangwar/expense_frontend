import { TransactionListSkeleton } from "@/components/skeleton/TransactionList";
import { SummaryCard } from "@/components/SummaryCard";
import { useTheme } from "@/context/ThemeContext";
import { ActionButtons } from "@/features/dashboard/ActionButtons";
import { TransactionList } from "@/features/transactions/TransactionList";
import api from "@/lib/api/api";
import { IExpenses } from "@/types";
import { useEffect, useState } from "react";
import { RefreshControl, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function DashboardScreen() {
  const { theme, isDarkMode } = useTheme();
  const [transactions, setTransactions] = useState<IExpenses[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [selectedRange, setSelectedRange] = useState("This Month");
  useEffect(() => {
    fetchTransactions();
  }, []);
  // console.log("transactions", transactions);
  const fetchTransactions = async (range = selectedRange) => {
    try {
      setLoading(true);
      let data = [];
      const now = new Date();
      if (range === "This Month") {
        const response = await api.get(
          `/expenses/month/${now.getMonth() + 1}/${now.getFullYear()}`
        );
        data = response.data;
      } else if (range === "Today") {
        const response = await api.get(
          `/expenses/month/${now.getMonth() + 1}/${now.getFullYear()}`
        );
        data = response.data.filter(
          (t: IExpenses) => new Date(t.expense_date).getDate() === now.getDate()
        );
      } else {
        // This Week, This Year
        const response = await api.get("/expenses");
        data = response.data;

        if (range === "This Week") {
          const startOfWeek = new Date(now);
          startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday as start
          startOfWeek.setHours(0, 0, 0, 0);

          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 6);
          endOfWeek.setHours(23, 59, 59, 999);

          data = data.filter((t: IExpenses) => {
            const tDate = new Date(t.expense_date);
            return tDate >= startOfWeek && tDate <= endOfWeek;
          });
        } else if (range === "This Year") {
          data = data.filter(
            (t: IExpenses) => new Date(t.expense_date).getFullYear() === now.getFullYear()
          );
        }
      }
      setTransactions(data);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    } finally {
      setLoading(false);
    }
  };
  const amountSum = transactions.filter(t => t.expense_type === "expense").reduce(
    (total, transaction) =>
      total + transaction.amount,
    0
  );
  const incomeSum = transactions.filter(t => t.expense_type === "income").reduce(
    (total, transaction) =>
      total + transaction.amount,
    0
  );

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      fetchTransactions();
      setRefreshing(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.background} />
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
          <Text style={[styles.date, { color: theme.textSecondary }]}>{new Date().toLocaleDateString()}</Text>
        </View>

        <SummaryCard
          amountSum={amountSum}
          incomeSum={incomeSum}
          selectedRange={selectedRange}
          onRangeChange={(range) => {
            setSelectedRange(range);
            fetchTransactions(range);
          }}
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
