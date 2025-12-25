import { IconSymbol } from "@/components/ui/icon-symbol";
import { StyleSheet, Text, View } from "react-native";

function SummaryItem({ title, amount, icon, color, isFullWidth = false }: { title: string; amount: string; icon: string; color: string; isFullWidth?: boolean }) {
    return (
        <View style={[styles.card, isFullWidth && styles.fullWidth]}>
            <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
                {/* @ts-ignore */}
                <IconSymbol name={icon} size={20} color={color} />
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.amount}>{amount}</Text>
            </View>
        </View>
    );
}

export function AnalysisSummary() {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={{ flex: 1 }}>
                    <SummaryItem
                        title="Income"
                        amount="45000.00"
                        icon="arrow.up.right"
                        color="#4CAF50"
                    />
                </View>
                <View style={{ width: 12 }} />
                <View style={{ flex: 1 }}>
                    <SummaryItem
                        title="Expenses"
                        amount="3300.00"
                        icon="arrow.down.right"
                        color="#FD3C4A"
                    />
                </View>
            </View>

            <SummaryItem
                title="Transactions"
                amount="3"
                icon="doc.text.fill"
                color="#2196F3"
                isFullWidth
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 12,
        marginBottom: 24,
    },
    row: {
        flexDirection: "row",
    },
    card: {
        backgroundColor: "#15171E",
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: "#2A2C35",
        flexDirection: "row",
        alignItems: "center",
    },
    fullWidth: {
        width: "100%",
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    content: {
        flex: 1,
    },
    title: {
        color: "#A0A0A5",
        fontSize: 12,
        marginBottom: 4,
    },
    amount: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    }
});
