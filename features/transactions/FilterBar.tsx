import { IconSymbol } from "@/components/ui/icon-symbol";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface FilterBarProps {
    activeFilters: {
        type: string | null;
        sort: string | null;
    };
    onFilterChange: (filters: { type: string | null; sort: string | null }) => void;
}

function FilterChip({
    label,
    active = false,
    hasDropdown = false,
    onPress,
}: {
    label: string;
    active?: boolean;
    hasDropdown?: boolean;
    onPress?: () => void;
}) {
    return (
        <TouchableOpacity
            style={[styles.chip, active && styles.chipActive]}
            onPress={onPress}
        >
            <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
            {hasDropdown && (
                <View style={styles.dropdownIcon}>
                    {/* @ts-ignore */}
                    <IconSymbol name="chevron.down" size={14} color={active ? "#fff" : "#5E60CE"} />
                </View>
            )}
        </TouchableOpacity>
    );
}

export function FilterBar({ activeFilters, onFilterChange }: FilterBarProps) {
    const toggleType = (type: string) => {
        onFilterChange({
            ...activeFilters,
            type: activeFilters.type === type ? null : type,
        });
    };

    const toggleSort = (sort: string) => {
        onFilterChange({
            ...activeFilters,
            sort: activeFilters.sort === sort ? null : sort,
        });
    };

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
            style={styles.scrollView}
        >
            <FilterChip
                label="Income"
                active={activeFilters.type === "income"}
                onPress={() => toggleType("income")}
            />
            <FilterChip
                label="Expense"
                active={activeFilters.type === "expense"}
                onPress={() => toggleType("expense")}
            />
            <View style={styles.divider} />
            <FilterChip
                label="Highest"
                active={activeFilters.sort === "highest"}
                onPress={() => toggleSort("highest")}
            />
            <FilterChip
                label="Lowest"
                active={activeFilters.sort === "lowest"}
                onPress={() => toggleSort("lowest")}
            />
            <FilterChip
                label="Newest"
                active={activeFilters.sort === "newest"}
                onPress={() => toggleSort("newest")}
            />
            <FilterChip
                label="Oldest"
                active={activeFilters.sort === "oldest"}
                onPress={() => toggleSort("oldest")}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        marginBottom: 20,
        flexGrow: 0,
        flexShrink: 0,
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
        backgroundColor: "#5E60CE",
        borderColor: "#5E60CE",
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
    divider: {
        width: 1,
        height: 24,
        backgroundColor: "#2A2C35",
        marginHorizontal: 4,
    },
});
