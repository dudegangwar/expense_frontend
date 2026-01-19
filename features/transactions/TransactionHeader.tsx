import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function Header() {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.close}>✕</Text>
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Add Transaction</Text>

      {/* <TouchableOpacity>
        <Text style={styles.save}>SAVE</Text>
      </TouchableOpacity> */}
    </View>
  );
}
export { Header };

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    flex: 1,
    color: "#fff",
  },
  close: {
    fontSize: 22,
    color: "#fff",
  },
  save: {
    color: "#8BC34A",
    fontWeight: "700",
  },
});