import { IconSymbol } from "@/components/ui/icon-symbol";
import { useTheme } from "@/context/ThemeContext";
import { StyleSheet, Text, View } from "react-native";
interface CategoryItemProps {
    title: string;
    percentage: string;
    amount: string;
    icon: string;
    color: string;
    theme: any;
}
function CategoryItem({ title, percentage, amount, icon, color, theme }: CategoryItemProps) {
    return (
        <View style={[styles.item, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
            <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
                {/* @ts-ignore */}
                <IconSymbol name={icon} size={20} color={color} />
            </View>
            <View style={styles.content}>
                <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
                <Text style={[styles.percentage, { color: theme.textSecondary }]}>{percentage}</Text>
            </View>
            <View style={styles.right}>
                <Text style={[styles.amount, { color: theme.text }]}>{amount}</Text>
                {/* @ts-ignore */}
                <IconSymbol name="chevron.right" size={16} color={theme.textSecondary} />
            </View>
        </View>
    );
}

interface CategoryBreakdownItem {
    title: string;
    percentage: string;
    amount: string;
    icon: string;
    color: string;
}

export function CategoryBreakdown({ categories }: { categories: CategoryBreakdownItem[] }) {
    const { theme } = useTheme();
    return (
        <View style={styles.container}>
            <Text style={[styles.headerTitle, { color: theme.text }]}>Category Breakdown</Text>

            {categories.map((item, index) => (
                <View key={index} style={{ marginBottom: 8 }}>
                    <CategoryItem
                        title={item.title}
                        percentage={item.percentage}
                        amount={item.amount}
                        icon={item.icon}
                        color={item.color}
                        theme={theme}
                    />
                </View>
            ))}
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
