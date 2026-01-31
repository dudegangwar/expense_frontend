import { useTheme } from "@/context/ThemeContext";
import api, { Category, getCategories } from "@/lib/api/api";
import React, { useEffect, useMemo, useState } from "react";
import { Alert, ScrollView, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header as AnalysisHeader } from "../../../features/analytics/AnalysisHeader";
import { AnalysisSummary } from "../../../features/analytics/AnalysisSummary";
import { AnalysisToggle } from "../../../features/analytics/AnalysisToggle";
import { CategoryAnalysis } from "../../../features/analytics/CategoryAnalysis";
import { CategoryBreakdown } from "../../../features/analytics/CategoryBreakdown";
import { WeeklyAnalysis } from "../../../features/analytics/WeeklyAnalysis";
import { MonthSelector } from "../../../features/transactions/MonthSelector";

const COLORS = [
  "#2196F3", "#00BCD4", "#4CAF50", "#FF9800", "#E91E63", "#9C27B0", "#3F51B5", "#009688", "#FFC107", "#795548"
];

const formatAmount = (amount: number) => {
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}k`;
  }
  return `₹${amount}`;
};

export default function AnalysisScreen() {
  const { theme, isDarkMode } = useTheme();
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [activeView, setActiveView] = useState<'categories' | 'trends'>('categories');
  const [transactions, setTransactions] = useState<IExpenses[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [selectedMonth]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [expensesResponse, categoriesData] = await Promise.all([
        api.get(`/expenses/month/${selectedMonth.getMonth() + 1}/${selectedMonth.getFullYear()}`),
        getCategories()
      ]);
      setTransactions(expensesResponse.data);
      setCategories(categoriesData);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch analysis data");
    } finally {
      setLoading(false);
    }
  };

  // Calculate Summary
  const { income, expense } = useMemo(() => {
    const incomeVal = transactions
      .filter((t) => t.expense_type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expenseVal = transactions
      .filter((t) => t.expense_type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return { income: incomeVal, expense: expenseVal };
  }, [transactions]);

  // Process Categories
  const { chartData, breakdownData } = useMemo(() => {
    const expenseTransactions = transactions.filter((t) => t.expense_type === 'expense');
    const totalExpenseAbs = Math.abs(expense);

    const categoryMap = new Map<string, { amount: number; color: string; icon: string }>();

    expenseTransactions.forEach((t) => {
      const categoryName = t.category_name || "Uncategorized";

      // Find category details
      const category = categories.find(c => c.name === categoryName);
      // Assign color based on category index or hash if not found
      const colorIndex = categories.findIndex(c => c.name === categoryName);
      const color = colorIndex >= 0 ? COLORS[colorIndex % COLORS.length] : "#808080";
      const icon = category?.icon || "questionmark";

      const current = categoryMap.get(categoryName) || { amount: 0, color, icon };
      categoryMap.set(categoryName, {
        amount: current.amount + Math.abs(t.amount),
        color: current.color,
        icon: current.icon
      });
    });

    const categoryData = Array.from(categoryMap.entries()).map(([name, data]) => ({
      text: name,
      value: totalExpenseAbs > 0 ? (data.amount / totalExpenseAbs) * 100 : 0,
      amount: data.amount,
      color: data.color,
      icon: data.icon
    })).sort((a, b) => b.value - a.value);

    const chartData = categoryData.map(c => ({
      value: c.value,
      color: c.color,
      text: c.value > 4 ? `${Math.round(c.value)}%` : '',
      name: c.text,
      focused: false
    }));

    const breakdownData = categoryData.map(c => ({
      title: c.text,
      percentage: `${c.value.toFixed(1)}%`,
      amount: `₹${c.amount.toFixed(2)}`,
      icon: c.icon,
      color: c.color
    }));

    return { chartData, breakdownData };
  }, [transactions, categories, expense]);

  // Process Trends Data (Weekly Expenses)
  const { expenseTrendsData, incomeTrendsData } = useMemo(() => {
    const expenseTransactions = transactions.filter((t) => t.expense_type === 'expense');
    const incomeTransactions = transactions.filter((t) => t.expense_type === 'income');

    const getWeek = (date: Date) => {
      const day = date.getDate();
      if (day <= 7) return 1;
      if (day <= 14) return 2;
      if (day <= 21) return 3;
      return 4;
    };

    const expenseMap = new Map<number, number>();
    expenseTransactions.forEach(t => {
      const week = getWeek(new Date(t.expense_date));
      expenseMap.set(week, (expenseMap.get(week) || 0) + Math.abs(t.amount));
    });

    const incomeMap = new Map<number, number>();
    incomeTransactions.forEach(t => {
      const week = getWeek(new Date(t.expense_date));
      incomeMap.set(week, (incomeMap.get(week) || 0) + Math.abs(t.amount));
    });

    const weeks = [1, 2, 3, 4];

    const expenseTrendsData = weeks.map(week => {
      const amount = expenseMap.get(week) || 0;
      return {
        value: amount,
        label: `Week ${week}`,
        dataPointText: formatAmount(amount)
      };
    });

    const incomeTrendsData = weeks.map(week => {
      const amount = incomeMap.get(week) || 0;
      return {
        value: amount,
        label: `Week ${week}`,
        dataPointText: formatAmount(amount)
      };
    });

    return { expenseTrendsData, incomeTrendsData };
  }, [transactions]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.background} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <AnalysisHeader />

        <MonthSelector
          selectedMonth={selectedMonth}
          onMonthChange={setSelectedMonth}
          isAllMonths={false}
        />

        <AnalysisSummary
          income={income}
          expense={expense}
          transactionCount={transactions.length}
        />
        <AnalysisToggle
          activeView={activeView}
          onToggle={setActiveView}
        />

        {activeView === 'categories' ? (
          <>
            <CategoryAnalysis data={chartData} />
            <CategoryBreakdown categories={breakdownData} />
          </>
        ) : (
          <WeeklyAnalysis incomeData={incomeTrendsData} expenseData={expenseTrendsData} />
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
  }
});
