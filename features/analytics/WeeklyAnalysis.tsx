import { StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

function WeeklyAnalysis() {
  const data = [
    { value: 8 },
    { value: 22 },
    { value: 10 },
    { value: 12 },
    { value: 2 },
  ];

  return (
    <View style={styles.chartCard}>
      <Text style={styles.cardTitle}>Weekly Analysis</Text>

      <LineChart
        data={data}
        curved
        hideDataPoints
        thickness={4}
        color="#9CCC65"
        startFillColor="#9CCC65"
        endFillColor="#ffffff"
        startOpacity={0.3}
        endOpacity={0}
        spacing={50}
        initialSpacing={20}
        yAxisColor="transparent"
        xAxisColor="transparent"
        yAxisTextStyle={{ color: "#777" }}
        xAxisLabelTexts={["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"]}
      />
    </View>
  );
}
export { WeeklyAnalysis };

const styles = StyleSheet.create({
  chartCard: {
    backgroundColor: "#F9FFF8",
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },
});    