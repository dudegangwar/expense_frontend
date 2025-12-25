import { ScrollView, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header as AnalysisHeader } from "../../../features/analytics/AnalysisHeader";
import { AnalysisSummary } from "../../../features/analytics/AnalysisSummary";
import { AnalysisToggle } from "../../../features/analytics/AnalysisToggle";
import { CategoryAnalysis } from "../../../features/analytics/CategoryAnalysis";
import { CategoryBreakdown } from "../../../features/analytics/CategoryBreakdown";
import { DateFilters } from "../../../features/analytics/DateFilters";

export default function AnalysisScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0D12" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <AnalysisHeader />
        <DateFilters />
        <AnalysisSummary />
        <AnalysisToggle />
        <CategoryAnalysis />
        <CategoryBreakdown />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0D12",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  }
});
