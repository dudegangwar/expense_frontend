import { IconSymbol } from "@/components/ui/icon-symbol";
import { useTransactionStore } from "@/store/transaction";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function ActionButtons() {
    const { setExpenseType } = useTransactionStore();
    const handleNavigate = (type: "expense" | "income") => {
        setExpenseType(type);
        router.push("/add");
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.button, styles.incomeButton]} onPress={() => handleNavigate("income")}>
                {/* @ts-ignore */}
                <IconSymbol name="arrow.up.right" size={20} color="#fff" />
                <Text style={styles.buttonText}>Add Income</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.expenseButton]} onPress={() => handleNavigate("expense")}>
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
    budgetButton: {
        backgroundColor: "#7F3DFF", // Purple
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
