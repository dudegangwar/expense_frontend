import { IconSymbol } from "@/components/ui/icon-symbol";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

function FilterChip({ label, active = false, hasDropdown = false }: { label: string; active?: boolean; hasDropdown?: boolean }) {
    return (
        <TouchableOpacity style={[styles.chip, active && styles.chipActive]}>
            <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
            {hasDropdown && (
                <View style={styles.dropdownIcon}>
                    {/* @ts-ignore */}
                    <IconSymbol name="chevron.down" size={14} color="#5E60CE" />
                </View>
            )}
        </TouchableOpacity>
    );
}

export function FilterBar() {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
            style={styles.scrollView}
        >
            <FilterChip label="All" />
            <FilterChip label="Categories" hasDropdown />
            <FilterChip label="All Years" hasDropdown />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        marginBottom: 20,
        maxHeight: 40,
    },
    container: {
        gap: 8,
        paddingRight: 20,
    },
    chip: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#15171E", // Dark card
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#2A2C35",
    },
    chipActive: {
        backgroundColor: "#2A2C35",
    },
    chipText: {
        color: "#E0E0E0",
        fontSize: 13,
        fontWeight: "500",
    },
    chipTextActive: {
        color: "#fff",
    },
    dropdownIcon: {
        marginLeft: 6,
    },
});
