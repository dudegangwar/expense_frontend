import { Dimensions, StyleSheet, Text, View } from "react-native";
import { CurveType, LineChart } from "react-native-gifted-charts";

interface TrendsData {
  value: number;
  label: string;
  dataPointText?: string;
}

export function WeeklyAnalysis({ incomeData, expenseData }: { incomeData: TrendsData[], expenseData: TrendsData[] }) {
  const hasData = (incomeData && incomeData.length > 0) || (expenseData && expenseData.length > 0);

  if (!hasData) {
    return (
      <View style={styles.chartCard}>
        <Text style={styles.cardTitle}>Trends</Text>
        <Text style={{ color: '#A0A0A5', textAlign: 'center', paddingVertical: 20 }}>No data available</Text>
      </View>
    );
  }

  const formatYLabel = (value: string) => {
    const num = parseFloat(value);
    if (num >= 1000) {
      return `₹${(num / 1000).toFixed(1)}k`;
    }
    return `₹${num}`;
  };

  const screenWidth = Dimensions.get("window").width;
  // console.log("screenWidth", screenWidth);
  const chartWidth = screenWidth - 80; // 40 padding horizontal + 40 card padding

  return (
    <View style={styles.chartCard}>
      <Text style={styles.cardTitle}>Trends</Text>

      <LineChart
        data={incomeData}
        data2={expenseData}
        // width={chartWidth}
        curved
        curveType={CurveType.QUADRATIC}
        // curvature={0.2}
        hideDataPoints={false}
        thickness={3}
        color="#4CAF50"
        color2="#FF5252"
        adjustToWidth={true}
        startFillColor="#4CAF50"
        endFillColor="#4CAF50"
        startOpacity={0.3}
        endOpacity={0.1}
        endSpacing={0}
        spacing={chartWidth / 4}
        initialSpacing={20}
        yAxisColor="transparent"
        xAxisColor="transparent"
        yAxisTextStyle={{ color: "#A0A0A5", fontSize: 10 }}
        xAxisLabelTextStyle={{ color: "#A0A0A5", fontSize: 10 }}
        rulesColor="#2A2C35"
        noOfSections={4}
        rulesType="solid"
        dataPointsColor="#4CAF50"
        dataPointsColor2="#FF5252"
        textColor="#fff"
        textFontSize={10}
        textShiftY={-10}
        textShiftX={-5}
        formatYLabel={formatYLabel}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chartCard: {
    backgroundColor: "#15171E",
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    marginTop: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    color: "#fff",
  },
});