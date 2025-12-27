import { IconSymbol } from "@/components/ui/icon-symbol";
import { IExpenses } from "@/types";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TransactionItem } from "./TransactionItem";

// Adjusted TransactionGroup to render children items
function TransactionGroupHeader({
  day,
  count,
}: {
  day: string;
  count: number;
}) {
  return (
    <View style={styles.groupHeader}>
      <View style={styles.groupHeaderLeft}>
        {/* @ts-ignore */}
        <IconSymbol name="chevron.down" size={20} color="#5E60CE" />
        <Text style={styles.dayText}>{day}</Text>
      </View>
      <Text style={styles.countText}>{count} Transactions</Text>
    </View>
  );
}

export function TransactionList({
  transactions,
}: {
  transactions: IExpenses[];
}) {
  const groupTransactionsByMonthAndYear = (transactions: IExpenses[]) => {
    return transactions.reduce((acc: any, txn: IExpenses) => {
      const date = new Date(txn.expense_date);
      const year = date.getFullYear();
      const month = date.toLocaleString("en-US", { month: "short" }); // Dec

      const key = `${month}-${year}`;

      if (!acc[key]) {
        acc[key] = {
          month,
          year,
          transactions: [],
          totalAmount: 0,
        };
      }

      acc[key].transactions.push(txn);
      acc[key].totalAmount += Number(txn.amount);

      return acc;
    }, {});
  };

  const transactionGroups = groupTransactionsByMonthAndYear(transactions);
 
  return (
  <View style={styles.container}>
    
    {transactions.length > 0 &&
      Object.entries(transactionGroups).map(([key, group]: [string, any]) => (
        <React.Fragment key={key}>
          <TransactionGroupHeader
            day={key}
            count={group?.transactions?.length}
          />

          {group.transactions.map((transaction: any) => (
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
        </React.Fragment>
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
  },
});
