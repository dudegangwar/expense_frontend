import { StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

interface ChartData {
  value: number;
  color: string;
  text: string;
  name?: string;
  focused?: boolean;
}

export function CategoryAnalysis({ data }: { data: ChartData[] }) {
  // Calculate total for percentage if needed, or assume data is already processed
  // If data is empty, show a placeholder or empty state
  if (!data || data.length === 0) {
    return (
      <View style={styles.chartCard}>
        <Text style={{ color: '#A0A0A5', textAlign: 'center' }}>No data available</Text>
      </View>
    );
  }

  // Find the largest segment to display in center or just display total
  const maxSegment = data.reduce((prev, current) => (prev.value > current.value) ? prev : current);

  return (
    <View style={styles.chartCard}>
      <View style={styles.pieRow}>
        <View style={styles.chartContainer}>
          <PieChart
            donut
            innerRadius={60}
            data={data}
            centerLabelComponent={() => {
              return <Text style={styles.centerLabel}>{Math.round(maxSegment.value)}%</Text>;
            }}
            radius={100}
            strokeWidth={2}
            strokeColor="#15171E"
            showText
            textColor="white"
            textSize={12}
            fontWeight="bold"
          />
        </View>

        <View style={styles.legend}>
          <Text style={styles.legendTitle}>Categories</Text>

          {data.map((item) => (
            <View key={item.name || item.text} style={styles.legendItem}>
              <View
                style={[styles.legendDot, { backgroundColor: item.color }]}
              />
              <View>
                <Text style={styles.legendText}>{item.name || item.text}</Text>
                <Text style={styles.legendValue}>{item.value.toFixed(1)}%</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chartCard: {
    backgroundColor: "#15171E", // Dark card
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    marginTop: 10,
  },
  pieRow: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
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
    width: '100%',
    marginTop: 20,
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