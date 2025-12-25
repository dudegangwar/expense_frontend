import { IconSymbol } from "@/components/ui/icon-symbol";
import { StyleSheet, Text, View } from "react-native";

interface Transaction {
    id: string;
    title: string;
    category: string;
    amount: string;
    date: string;
    color: string;
    type: 'income' | 'expense';
}

interface TransactionGroupProps {
    date: string;
    day: string; // e.g. "Yesterday", "14 December Sun"
    totalAmount: string; // e.g. "₹3,000.00"
    isPositive?: boolean; // for the total amount color
    transactions?: Transaction[];
}

export function TransactionGroup({ day, totalAmount, isPositive = false }: TransactionGroupProps) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.left}>
                    {/* @ts-ignore */}
                    <IconSymbol name="chevron.down" size={20} color="#E0E0E0" />
                    <Text style={styles.dayText}>{day}</Text>
                </View>

                <View style={styles.right}>
                    <Text style={[styles.amountText, { color: isPositive ? "#4CAF50" : "#FD3C4A" }]}>
                        {isPositive ? '+' : ''}{totalAmount}
                    </Text>
                    <View style={styles.addButton}>
                        {/* @ts-ignore */}
                        <IconSymbol name="plus" size={16} color="#5E60CE" />
                    </View>
                </View>
            </View>
            {/* We could render children transactions here if we wanted the list to be expanded */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 12,
        backgroundColor: "#15171E",
        borderRadius: 16,
        padding: 16,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    left: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    dayText: {
        color: "#E0E0E0",
        fontSize: 14,
        fontWeight: "500",
    },
    right: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    amountText: {
        fontSize: 14,
        fontWeight: "600",
    },
    addButton: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: "rgba(94, 96, 206, 0.15)", // faint purple
        justifyContent: "center",
        alignItems: "center",
    }
});
