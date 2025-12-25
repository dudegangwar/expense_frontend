import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import { IconSymbol } from "./ui/icon-symbol";

// Helper for the small internal cards
function MiniCard({ icon, label, amount, action }: { icon: string; label: string; amount?: string; action?: string }) {
  return (
    <View style={styles.miniCard}>
      <View style={styles.miniHeader}>
        <View style={styles.iconContainer}>
          {/* @ts-ignore */}
          <IconSymbol name={icon} size={16} color="#FFD700" />
        </View>
        <Text style={styles.miniLabel}>{label}</Text>
      </View>
      {amount ? (
        <Text style={styles.miniValue}>{amount}</Text>
      ) : (
        <Text style={styles.miniAction}>{action}</Text>
      )}
    </View>
  );
}

export function SummaryCard() {
  return (
    <LinearGradient
      colors={["#5E60CE", "#7B61FF"]} // Purple gradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Expenses This Month</Text>
        <IconSymbol name="ellipsis.circle" size={20} color="rgba(255,255,255,0.7)" />
      </View>

      <Text style={styles.totalAmount}>₹3,300.00</Text>

      <View style={styles.row}>
        <MiniCard icon="arrow.up.right" label="Income - Month" amount="₹45.0K" />
        <View style={{ width: 12 }} />
        <MiniCard icon="creditcard.fill" label="Monthly Budget" action="Add Budget" />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 20,
    width: "100%",
    shadowColor: "#5E60CE",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  headerTitle: {
    color: "#E0E0E0",
    fontSize: 14,
    fontWeight: "500",
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
  },
  miniCard: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 16,
    padding: 12,
  },
  miniHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 6,
  },
  iconContainer: {
    // Optional: if we want a circle bg for icon
  },
  miniLabel: {
    color: "#E0E0E0",
    fontSize: 11,
    fontWeight: "500",
  },
  miniValue: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  miniAction: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});