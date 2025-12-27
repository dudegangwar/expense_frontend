import { IconSymbol } from "@/components/ui/icon-symbol";
import { IExpenses } from "@/types";
import React, { useState } from "react";
import { LayoutAnimation, Platform, StyleSheet, Text, TouchableOpacity, UIManager, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { TransactionItem } from "./TransactionItem";

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

function TransactionGroup({
  day,
  group,
}: {
  day: string;
  group: any;
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const rotate = useSharedValue(0);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
    rotate.value = withTiming(isExpanded ? -90 : 0);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotate.value}deg` }],
    };
  });

  return (
    <View style={styles.transactionGroup}>
      <TouchableOpacity
        style={styles.groupHeader}
        onPress={toggleExpand}
        activeOpacity={0.7}
      >
        <View style={styles.groupHeaderLeft}>
          <Animated.View style={animatedStyle}>
            {/* @ts-ignore */}
            <IconSymbol
              name="chevron.down"
              size={20}
              color="#5E60CE"
            />
          </Animated.View>
          <Text style={styles.dayText}>{day}</Text>
        </View>
        <Text style={styles.countText}>{group?.transactions?.length} Transactions</Text>
      </TouchableOpacity>

      {isExpanded && group.transactions.map((transaction: any) => (
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

export function TransactionList({
  transactions, showBy = "month"
}: {
  transactions: IExpenses[];
  showBy?: string;
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
  const groupTransactionsByDay = (transactions: IExpenses[]) => {
    return transactions.reduce((acc: any, txn: IExpenses) => {
      const date = new Date(txn.expense_date);

      const day = date.getDate(); // 27
      const month = date.toLocaleString("en-US", { month: "short" }); // Dec
      const year = date.getFullYear();

      const key = `${day}-${month}-${year}`;

      if (!acc[key]) {
        acc[key] = {
          day,
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


  const transactionGroups = showBy === "month" ? groupTransactionsByMonthAndYear(transactions) : groupTransactionsByDay(transactions);
  return (
    <View style={styles.container}>
      {transactions.length > 0 &&
        Object.entries(transactionGroups).map(([key, group]: [string, any]) => (
          <TransactionGroup key={key} day={key} group={group} />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    marginTop: 10,
  },
  transactionGroup: {
    marginBottom: 5,
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
    fontSize: 12,
    fontWeight: "700",
  },
  countText: {
    color: "#A0A0A5",
    fontSize: 13,
  },
});
