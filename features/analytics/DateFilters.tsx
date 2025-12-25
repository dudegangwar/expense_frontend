import { IconSymbol } from "@/components/ui/icon-symbol";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function FilterButton({ label, icon, value }: { label?: string; icon?: string; value: string }) {
    return (
        <TouchableOpacity style={styles.button}>
            {icon && (
                <View style={styles.iconWrapper}>
                    {/* @ts-ignore */}
                    <IconSymbol name={icon} size={16} color="#A0A0A5" />
                </View>
            )}
            <Text style={styles.value}>{value}</Text>
            {/* @ts-ignore */}
            <IconSymbol name="chevron.down" size={16} color="#5E60CE" />
        </TouchableOpacity>
    )
}

export function DateFilters() {
    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <FilterButton icon="calendar" value="Month" />
            </View>
            <View style={{ width: 12 }} />
            <View style={{ flex: 1 }}>
                <FilterButton value="December 2025" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginBottom: 16,
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#15171E",
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#2A2C35",
    },
    iconWrapper: {
        marginRight: 8,
    },
    value: {
        color: "#E0E0E0",
        fontSize: 14,
        fontWeight: "500",
        flex: 1,
    }
});
