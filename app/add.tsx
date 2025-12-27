import { useTransactionStore } from "@/store/transaction";
import React from "react";
import {
  StyleSheet,
  View
} from "react-native";
import { Header as TransactionHeader } from "../features/transactions/TransactionHeader";
import { Form as TransactionInput } from "../features/transactions/TransactionInput";
import { TypeToggle as TransactionTypeToggle } from "../features/transactions/TransactionTypeToggle";

export default function AddTransactionScreen() {
  const { expenseType, setExpenseType } = useTransactionStore();

  return (
    <View style={styles.container}>
      <TransactionHeader />
      <TransactionTypeToggle type={expenseType} setType={setExpenseType} />
      <TransactionInput type={expenseType} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9", // light green background
    paddingHorizontal: 20,
  },
});
