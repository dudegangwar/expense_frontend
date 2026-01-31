import { IconSymbol } from "@/components/ui/icon-symbol";
import { useTheme } from "@/context/ThemeContext";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface AnalysisToggleProps {
    activeView: 'categories' | 'trends';
    onToggle: (view: 'categories' | 'trends') => void;
}

export function AnalysisToggle({ activeView, onToggle }: AnalysisToggleProps) {
    const { theme } = useTheme();
    return (
        <View style={[styles.container, { backgroundColor: theme.cardBackground }]}>
            <TouchableOpacity
                style={activeView === 'categories' ? styles.tabActive : styles.tabInactive}
                onPress={() => onToggle('categories')}
            >
                {/* @ts-ignore */}
                <IconSymbol
                    name="chart.pie.fill"
                    size={16}
                    color={activeView === 'categories' ? "#fff" : theme.textSecondary}
                />
                <Text style={activeView === 'categories' ? styles.textActive : [styles.textInactive, { color: theme.textSecondary }]}>
                    Categories
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={activeView === 'trends' ? styles.tabActive : styles.tabInactive}
                onPress={() => onToggle('trends')}
            >
                {/* @ts-ignore */}
                <IconSymbol
                    name="chart.line.uptrend.xyaxis"
                    size={16}
                    color={activeView === 'trends' ? "#fff" : theme.textSecondary}
                />
                <Text style={activeView === 'trends' ? styles.textActive : [styles.textInactive, { color: theme.textSecondary }]}>
                    Trends
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#15171E",
        borderRadius: 16,
        padding: 4,
        marginBottom: 24,
    },
    tabActive: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#5E60CE", // Purple
        paddingVertical: 12,
        borderRadius: 12,
        gap: 8,
    },
    tabInactive: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        borderRadius: 12,
        gap: 8,
    },
    textActive: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 14,
    },
    textInactive: {
        color: "#A0A0A5",
        fontWeight: "600",
        fontSize: 14,
    }
});
