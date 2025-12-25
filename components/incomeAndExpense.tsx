import { StyleSheet, Text, View } from "react-native";
import { Card } from "./ui/Card";

function StatsCards() {
  return (
    <View style={styles.statsRow}>
      <StatCard title="INCOME" amount="₹40,000" type="income" />
      <StatCard title="EXPENSE" amount="₹55,012" type="expense" />
    </View>
  );
}

function StatCard({ title, amount, type }: { title: string; amount: string; type: "income" | "expense" }) {
  const isIncome = type === "income";

  return (
    <Card
      style={[
        styles.statCard,
        { backgroundColor: isIncome ? "#E8F5E9" : "#FDECEA" },
      ]}
    >
      <Text style={styles.statTitle}>{title}</Text>
      <Text
        style={[
          styles.statAmount,
          { color: isIncome ? "#4CAF50" : "#F44336" },
        ]}
      >
        {amount}
      </Text>
    </Card>
  );
}
export { StatsCards };

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    width: "48%",
    // borderRadius and padding handled by Card defaults, but width is specific here.
  },
  statTitle: {
    fontSize: 12,
    color: "#777",
  },
  statAmount: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 8,
  },
});