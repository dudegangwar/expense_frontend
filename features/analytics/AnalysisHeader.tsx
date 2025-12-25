import { IconSymbol } from "@/components/ui/icon-symbol";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Analysis</Text>

      <TouchableOpacity style={styles.exportButton}>
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
    color: "#fff"
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
  }
});