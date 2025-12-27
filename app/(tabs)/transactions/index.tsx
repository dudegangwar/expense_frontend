import { TransactionListSkeleton } from "@/components/skeleton/TransactionList";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { FilterBar } from "@/features/transactions/FilterBar";
import { SearchBar } from "@/features/transactions/SearchBar";
import { TransactionList } from "@/features/transactions/TransactionList";
import api from "@/lib/api/api";
import { IExpenses } from "@/types";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
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
  const [transactions, setTransactions] = useState<IExpenses[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await api.get("/expenses");
      setTransactions(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0D12" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transactions</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/add")}
        >
          {/* @ts-ignore */}
          <IconSymbol name="plus" size={20} color="#5E60CE" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <SearchBar />
        <FilterBar />
        <ScrollView
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
            <TransactionList transactions={transactions} />
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
    paddingHorizontal: 20,
    flex: 1,
  },
});
