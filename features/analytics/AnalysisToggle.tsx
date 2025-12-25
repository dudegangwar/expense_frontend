import { IconSymbol } from "@/components/ui/icon-symbol";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function AnalysisToggle() {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.tabActive}>
                {/* @ts-ignore */}
                <IconSymbol name="chart.pie.fill" size={16} color="#fff" />
                <Text style={styles.textActive}>Categories</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabInactive}>
                {/* @ts-ignore */}
                <IconSymbol name="chart.line.uptrend.xyaxis" size={16} color="#A0A0A5" />
                <Text style={styles.textInactive}>Trends</Text>
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
