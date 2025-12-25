import { IconSymbol } from "@/components/ui/icon-symbol";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function ActionButtons() {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.button, styles.incomeButton]}>
                {/* @ts-ignore */}
                <IconSymbol name="arrow.up.right" size={20} color="#fff" />
                <Text style={styles.buttonText}>Add Income</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.expenseButton]}>
                {/* @ts-ignore */}
                <IconSymbol name="arrow.down.right" size={20} color="#fff" />
                <Text style={styles.buttonText}>Add Expense</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 16,
        marginBottom: 24,
    },
    button: {
        flex: 1,
        height: 56,
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
    incomeButton: {
        backgroundColor: "#00A86B", // Green
    },
    expenseButton: {
        backgroundColor: "#FD3C4A", // Red
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
