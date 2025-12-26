import React, { useState } from "react";
import {
  StyleSheet,
  View
} from "react-native";
import { Header as TransactionHeader } from "../features/transactions/TransactionHeader";
import { Form as TransactionInput } from "../features/transactions/TransactionInput";
import { TypeToggle as TransactionTypeToggle } from "../features/transactions/TransactionTypeToggle";

export default function AddTransactionScreen() {
  const [type, setType] = useState<"expense" | "income">("expense");

  return (
    <View style={styles.container}>
      <TransactionHeader />
      <TransactionTypeToggle type={type} setType={setType} />
      <TransactionInput type={type} />
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
