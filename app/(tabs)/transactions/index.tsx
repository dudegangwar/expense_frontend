import { TransactionListSkeleton } from "@/components/skeleton/TransactionList";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useTheme } from "@/context/ThemeContext";
import { DateTabs } from "@/features/transactions/DateTabs";
import { FilterBar } from "@/features/transactions/FilterBar";
import { MonthSelector } from "@/features/transactions/MonthSelector";
import { SearchBar } from "@/features/transactions/SearchBar";
import { TransactionList } from "@/features/transactions/TransactionList";
import api from "@/lib/api/api";
import { IExpenses } from "@/types";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TransactionsScreen() {
  const { theme, isDarkMode } = useTheme();
  const [transactions, setTransactions] = useState<IExpenses[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [isYearView, setIsYearView] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<{
    type: string | null;
    sort: string | null;
  }>({ type: null, sort: null });

  useEffect(() => {
    fetchTransactions();
  }, [selectedMonth, isYearView]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);

      if (isYearView) {
        // Fetch all transactions (or by year if API supported it, but user asked for "whole year")
        // Assuming /expenses returns all transactions, we can filter by year client-side or if API supports year param
        // For now, let's assume /expenses returns all and we filter by selectedMonth's year
        const response = await api.get("/expenses");
        const yearTransactions = response.data.filter((t: IExpenses) =>
          new Date(t.expense_date).getFullYear() === selectedMonth.getFullYear()
        );
        setTransactions(yearTransactions);
      } else {
        // Fetch by month
        const response = await api.get(
          `/expenses/month/${selectedMonth.getMonth() + 1}/${selectedMonth.getFullYear()}`
        );
        setTransactions(response.data);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      fetchTransactions();
      setRefreshing(false);
    }, 2000);
  };

  const filteredTransactions = transactions.filter((t) => {
    // Date Filter
    if (selectedDate) {
      const tDate = new Date(t.expense_date);
      if (
        tDate.getDate() !== selectedDate.getDate() ||
        tDate.getMonth() !== selectedDate.getMonth() ||
        tDate.getFullYear() !== selectedDate.getFullYear()
      ) {
        return false;
      }
    }

    // Search Filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const notes = t.notes?.toLowerCase() || "";
      const category = t.category_name?.toLowerCase() || "";
      if (!notes.includes(query) && !category.includes(query)) {
        return false;
      }
    }

    // Type Filter
    if (activeFilters.type) {
      if (activeFilters.type === "income" && t.expense_type !== "income") return false;
      if (activeFilters.type === "expense" && t.expense_type !== "expense") return false;
    }

    return true;
  }).sort((a, b) => {
    // Sort Filter
    if (activeFilters.sort) {
      if (activeFilters.sort === "highest") return Math.abs(b.amount) - Math.abs(a.amount);
      if (activeFilters.sort === "lowest") return Math.abs(a.amount) - Math.abs(b.amount);
      if (activeFilters.sort === "newest") return new Date(b.expense_date).getTime() - new Date(a.expense_date).getTime();
      if (activeFilters.sort === "oldest") return new Date(a.expense_date).getTime() - new Date(b.expense_date).getTime();
    }
    return 0;
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.background} />

      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Transactions</Text>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}
          onPress={() => router.push("/add")}
        >
          {/* @ts-ignore */}
          <IconSymbol name="plus" size={20} color="#5E60CE" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <MonthSelector
          selectedMonth={selectedMonth}
          isAllMonths={isYearView}
          onMonthChange={(date) => {
            setSelectedMonth(date);
            setIsYearView(false);
            setSelectedDate(null);
          }}
          onAllMonthsSelect={() => {
            setIsYearView(true);
            setSelectedDate(null);
          }}
        />
        {!isYearView && (
          <DateTabs
            selectedMonth={selectedMonth}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
        )}

        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
        <FilterBar activeFilters={activeFilters} onFilterChange={setActiveFilters} />
        <ScrollView
          style={{ flex: 1 }}
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
          {loading ? (
            <TransactionListSkeleton />
          ) : (
            <TransactionList transactions={filteredTransactions} showBy="day" />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0D12",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#15171E",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2A2C35",
  },
  content: {
    flex: 1,
  },
});
