import { useTheme } from "@/context/ThemeContext";
import React, { useEffect, useRef } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface DateTabsProps {
    selectedMonth: Date;
    selectedDate: Date | null;
    onDateChange: (date: Date | null) => void;
}

export function DateTabs({ selectedMonth, selectedDate, onDateChange }: DateTabsProps) {
    const { theme, isDarkMode } = useTheme();
    const scrollViewRef = useRef<ScrollView>(null);

    const daysInMonth = new Date(
        selectedMonth.getFullYear(),
        selectedMonth.getMonth() + 1,
        0
    ).getDate();

    const days = Array.from({ length: daysInMonth }, (_, i) => {
        return new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), i + 1);
    });

    useEffect(() => {
        // Scroll to selected date or today if in current month
        if (selectedDate && scrollViewRef.current) {
            const dayIndex = selectedDate.getDate() - 1;
            // Approximate scroll position (width of tab + gap) * index
            // This is a simple estimation, might need refinement for exact centering
            scrollViewRef.current.scrollTo({ x: dayIndex * 60, animated: true });
        }
    }, [selectedDate, selectedMonth]);

    return (
        <View style={styles.container}>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.daysContainer}
            >
                <TouchableOpacity
                    style={[styles.dayTab, { backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0,0,0, 0.05)" }, selectedDate === null && styles.selectedDayTab]}
                    onPress={() => onDateChange(null)}
                >
                    <Text style={[styles.dayText, { color: theme.textSecondary }, selectedDate === null && styles.selectedDayText]}>
                        All
                    </Text>
                </TouchableOpacity>

                {days.map((date, index) => {
                    const isSelected =
                        selectedDate?.getDate() === date.getDate() &&
                        selectedDate?.getMonth() === date.getMonth();

                    const isToday = new Date().toDateString() === date.toDateString();

                    return (
                        <TouchableOpacity
                            key={index}
                            style={[styles.dayTab, { backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0,0,0, 0.05)" }, isSelected && styles.selectedDayTab]}
                            onPress={() => onDateChange(date)}
                        >
                            <Text style={[styles.dayName, { color: theme.textSecondary }, isSelected && styles.selectedDayText]}>
                                {date.toLocaleString("default", { weekday: "short" })}
                            </Text>
                            <Text style={[styles.dayNumber, { color: theme.text }, isSelected && styles.selectedDayText]}>
                                {date.getDate()}
                            </Text>
                            {isToday && <View style={styles.dot} />}
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
    daysContainer: {
        paddingHorizontal: 20,
        gap: 12,
    },
    dayTab: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 16,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 50,
    },
    selectedDayTab: {
        backgroundColor: "#5E60CE",
    },
    dayText: {
        color: "#A0A0A5",
        fontSize: 14,
        fontWeight: "600",
    },
    dayName: {
        color: "#A0A0A5",
        fontSize: 12,
        marginBottom: 4,
    },
    dayNumber: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
    selectedDayText: {
        color: "#fff",
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: "#FFD700",
        marginTop: 4,
    },
});
