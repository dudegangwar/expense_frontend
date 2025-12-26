import { IconSymbol } from "@/components/ui/icon-symbol";
import { StyleSheet, Text, View } from "react-native";

interface TransactionItemProps {
  title: string;
  subtitle?: string;
  amount: string;
  // date is typically in the group header now, but we can keep it if needed
  color?: string; // background color for icon
  icon?: string;
}

function TransactionItem({ title, subtitle, amount, color = "#2C2C35", icon = "creditcard.fill" }: TransactionItemProps) {
  // const isPositive = amount.startsWith("+");
  return (
    <View style={styles.transaction}>
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        {/* @ts-ignore */}
        <IconSymbol name={icon} size={20} color={"#5E60CE"} />
      </View>

      <View style={styles.transactionInfo}>
        <Text style={styles.transactionTitle}>{title}</Text>
        {subtitle && <Text style={styles.transactionSubtitle}>{subtitle}</Text>}
      </View>

      <View style={styles.transactionRight}>
        <Text
          style={[
            styles.transactionAmount,
            { color: "#FD3C4A" },
          ]}
        >
          ₹{amount}
        </Text>
      </View>
    </View>
  );
}
export { TransactionItem };

const styles = StyleSheet.create({
  transaction: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#15171E", // Dark card
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#2A2C35",
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  transactionInfo: {
    flex: 1,
    marginLeft: 12,
  },
  transactionTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 2,
  },
  transactionSubtitle: {
    fontSize: 12,
    color: "#A0A0A5",
  },
  transactionRight: {
    alignItems: "flex-end",
  },
  transactionAmount: {
    fontWeight: "600",
    fontSize: 15,
  },
});