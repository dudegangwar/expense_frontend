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

export function TransactionList() {
  return (
    <View style={styles.container}>

      <TransactionGroupHeader day="Dec 2025" count="3 transactions" />

      <TransactionItem
        title="Transportation"
        subtitle="tel on Sonet"
        category="Transportation"
        amount="-₹3,000.00"
        date="24 Mar" // not used in new design directly but required by interface if we kept it strict
        color="rgba(33, 150, 243, 0.1)" // Blue tint
        icon="car.fill"
      />

      <TransactionItem
        title="Healthcare"
        subtitle="Medicine from Rinku"
        category="Healthcare"
        amount="-₹300.00"
        date="24 Mar"
        color="rgba(0, 188, 212, 0.1)" // Cyan tint
        icon="cross.case.fill"
      />

      <TransactionItem
        title="Primary Job"
        category="Income"
        amount="+₹45,000.00"
        date="24 Mar"
        color="rgba(103, 58, 183, 0.1)" // Purple tint
        icon="briefcase.fill"
      />

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