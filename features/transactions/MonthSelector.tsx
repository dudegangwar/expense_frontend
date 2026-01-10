import { IconSymbol } from "@/components/ui/icon-symbol";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface MonthSelectorProps {
    selectedMonth: Date;
    onMonthChange: (date: Date) => void;
    isAllMonths?: boolean;
    onAllMonthsSelect?: () => void;
}

export function MonthSelector({ selectedMonth, onMonthChange, isAllMonths, onAllMonthsSelect }: MonthSelectorProps) {
    const months = Array.from({ length: 12 }, (_, i) => {
        const date = new Date(selectedMonth.getFullYear(), i, 1);
        return date;
    });

    const handlePrevYear = () => {
        onMonthChange(new Date(selectedMonth.getFullYear() - 1, selectedMonth.getMonth(), 1));
    };

    const handleNextYear = () => {
        onMonthChange(new Date(selectedMonth.getFullYear() + 1, selectedMonth.getMonth(), 1));
    };

    return (
        <View style={styles.container}>
            <View style={styles.yearSelector}>
                <TouchableOpacity onPress={handlePrevYear}>
                    <IconSymbol name="chevron.left" size={20} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.yearText}>{selectedMonth.getFullYear()}</Text>
                <TouchableOpacity onPress={handleNextYear}>
                    <IconSymbol name="chevron.right" size={20} color="#fff" />
                </TouchableOpacity>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.monthsContainer}
            >
                <TouchableOpacity
                    style={[styles.monthTab, isAllMonths && styles.selectedMonthTab]}
                    onPress={onAllMonthsSelect}
                >
                    <Text style={[styles.monthText, isAllMonths && styles.selectedMonthText]}>
                        All
                    </Text>
                </TouchableOpacity>

                {months.map((date, index) => {
                    const isSelected = !isAllMonths && date.getMonth() === selectedMonth.getMonth();
                    return (
                        <TouchableOpacity
                            key={index}
                            style={[styles.monthTab, isSelected && styles.selectedMonthTab]}
                            onPress={() => onMonthChange(date)}
                        >
                            <Text style={[styles.monthText, isSelected && styles.selectedMonthText]}>
                                {date.toLocaleString("default", { month: "short" })}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    yearSelector: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
        gap: 16,
    },
    yearText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    monthsContainer: {
        paddingHorizontal: 20,
        gap: 12,
    },
    monthTab: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
    selectedMonthTab: {
        backgroundColor: "#5E60CE",
    },
    monthText: {
        color: "#A0A0A5",
        fontSize: 14,
        fontWeight: "500",
    },
    selectedMonthText: {
        color: "#fff",
        fontWeight: "600",
    },
});
