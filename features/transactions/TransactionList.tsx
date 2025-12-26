import { IconSymbol } from "@/components/ui/icon-symbol";
import { StyleSheet, Text, View } from "react-native";
import { TransactionItem } from "./TransactionItem";

// Adjusted TransactionGroup to render children items
function TransactionGroupHeader({ day, count }: { day: string; count: string }) {
  return (
    <View style={styles.groupHeader}>
      <View style={styles.groupHeaderLeft}>
        {/* @ts-ignore */}
        <IconSymbol name="chevron.down" size={20} color="#5E60CE" />
        <Text style={styles.dayText}>{day}</Text>
      </View>
      <Text style={styles.countText}>{count}</Text>
    </View>
  );
}

export function TransactionList({ transactions }: { transactions: any[] }) {
  return (
    <View style={styles.container}>

      <TransactionGroupHeader day="Dec 2025" count="3 transactions" />

      {transactions.map((transaction: any) => (
        <TransactionItem
          key={transaction.id}
          title={transaction.notes}
          subtitle={transaction.category_name}
          amount={transaction.amount}
          date={transaction.expense_date}
          color="rgba(33, 150, 243, 0.1)"
          icon="car.fill"
        />
      ))}


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    marginTop: 10,
  },
  groupHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  groupHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dayText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  countText: {
    color: "#A0A0A5",
    fontSize: 13,
  }
});