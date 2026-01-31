import { IconSymbol } from "@/components/ui/icon-symbol";
import { useTheme } from "@/context/ThemeContext";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function Header({ onExport }: { onExport?: () => void }) {
  const { theme } = useTheme();
  return (
    <View style={styles.header}>
      <Text style={[styles.headerTitle, { color: theme.text }]}>Analysis</Text>

      <TouchableOpacity
        style={styles.exportButton}
        onPress={onExport}
        activeOpacity={0.8}
        accessibilityRole="button"
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        {/* @ts-ignore */}
        <IconSymbol name="arrow.down.doc.fill" size={16} color="#fff" />
        <Text style={styles.exportText}>Export</Text>
      </TouchableOpacity>
    </View>
  );
}
export { Header };

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
  },
  exportButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5E60CE",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  exportText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
