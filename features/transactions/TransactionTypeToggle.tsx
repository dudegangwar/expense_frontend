import { StyleSheet, View } from "react-native";
import { Toggle } from "../../components/ui/Toggle";

interface TypeToggleProps {
  type: "expense" | "income";
  setType: (type: "expense" | "income") => void;
}

function TypeToggle({ type, setType }: TypeToggleProps) {
  return (
    <View style={styles.toggleRow}>
      <Toggle
        label="Expense"
        active={type === "expense"}
        onPress={() => setType("expense")}
        activeColor="#C0392B"
      />
      <Toggle
        label="Income"
        active={type === "income"}
        onPress={() => setType("income")}
        activeColor="#8BC34A"
      />
    </View>
  );
}
export { TypeToggle };

const styles = StyleSheet.create({
  toggleRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
});
