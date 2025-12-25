import { IconSymbol } from "@/components/ui/icon-symbol";
import { StyleSheet, Text, View } from "react-native";

function CategoryItem({ title, percentage, amount, icon, color }: { title: string; percentage: string; amount: string; icon: string; color: string }) {
    return (
        <View style={styles.item}>
            <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
                {/* @ts-ignore */}
                <IconSymbol name={icon} size={20} color={color} />
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.percentage}>{percentage}</Text>
            </View>
            <View style={styles.right}>
                <Text style={styles.amount}>{amount}</Text>
                {/* @ts-ignore */}
                <IconSymbol name="chevron.right" size={16} color="#A0A0A5" />
            </View>
        </View>
    );
}

export function CategoryBreakdown() {
    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Category Breakdown</Text>

            <CategoryItem
                title="Transportation"
                percentage="90.9%"
                amount="₹3,000.00"
                icon="car.fill"
                color="#2196F3"
            />
            {/* Additional items can be added here */}
            {/* The screenshot shows a clipped second item or just one, adding just one for now to match main view */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 40,
    },
    headerTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 12,
    },
    item: {
        backgroundColor: "#15171E", // Dark card
        borderRadius: 16,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#2A2C35",
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    content: {
        flex: 1,
    },
    title: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 2,
    },
    percentage: {
        color: "#A0A0A5",
        fontSize: 12,
    },
    right: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    amount: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "600",
    }
});
