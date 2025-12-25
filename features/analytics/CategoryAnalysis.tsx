import { StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

function CategoryAnalysis() {
  const pieData = [
    { value: 91, color: "#2196F3", text: "Transportation", focused: true }, // Main blue
    { value: 9, color: "#00BCD4", text: "Healthcare" }, // Cyan
  ];

  return (
    <View style={styles.chartCard}>
      <View style={styles.pieRow}>
        <View style={styles.chartContainer}>
          <PieChart
            donut
            innerRadius={60}
            data={pieData}
            centerLabelComponent={() => {
              return <Text style={styles.centerLabel}>91%</Text>;
            }}
            radius={100}
            strokeWidth={2}
            strokeColor="#15171E"
          />
        </View>

        <View style={styles.legend}>
          <Text style={styles.legendTitle}>Categories</Text>

          {pieData.map((item) => (
            <View key={item.text} style={styles.legendItem}>
              <View
                style={[styles.legendDot, { backgroundColor: item.color }]}
              />
              <View>
                <Text style={styles.legendText}>{item.text}</Text>
                <Text style={styles.legendValue}>{item.value}%</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
export { CategoryAnalysis };

const styles = StyleSheet.create({
  chartCard: {
    backgroundColor: "#15171E", // Dark card
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    marginTop: 10,
  },
  pieRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerLabel: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  legend: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'center',
  },
  legendTitle: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 12,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center", // Align items to top to handle multiline if needed, or center
    marginBottom: 12,
    backgroundColor: "#1E2029",
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2A2C35",
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 4,
    marginRight: 10,
  },
  legendText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  legendValue: {
    color: "#A0A0A5",
    fontSize: 12,
  }
});