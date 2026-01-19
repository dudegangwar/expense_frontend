import { useTransactionStore } from "@/store/transaction";
import React from "react";

import {
  StyleSheet,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Header as TransactionHeader } from "../features/transactions/TransactionHeader";
import { Form as TransactionInput } from "../features/transactions/TransactionInput";
import { TypeToggle as TransactionTypeToggle } from "../features/transactions/TransactionTypeToggle";

export default function AddTransactionScreen() {
  const insets = useSafeAreaInsets();
  const { expenseType, setExpenseType } = useTransactionStore();

  return (

    <View style={{
      ...styles.container, paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left + 20,
      paddingRight: insets.right + 20,
    }}>

      <TransactionHeader />
      <TransactionTypeToggle type={expenseType} setType={setExpenseType} />
      <TransactionInput type={expenseType} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0D12", // light green background
    paddingHorizontal: 20,
  },
});
