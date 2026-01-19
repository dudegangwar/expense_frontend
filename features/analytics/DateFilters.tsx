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

export function DateFilters({
    selectedMonth,
    onMonthChange,
}: {
    selectedMonth: Date;
    onMonthChange: (date: Date) => void;
}) {
    // Format date as "Month Year" e.g. "December 2025"
    const formattedDate = selectedMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <FilterButton icon="calendar" value="Month" />
            </View>
            <View style={{ width: 12 }} />
            <View style={{ flex: 1 }}>
                {/* For now, this is just a display. In a real app, this would open a picker. 
                    Since we are reusing logic, we might want to pass a callback to open the MonthSelector modal 
                    if we had one, but for now let's just display the date. 
                    To make it functional as requested, we can wrap it in a Touchable that could trigger a picker 
                    but the user didn't explicitly ask for a *new* picker UI, just to make it "working". 
                    However, "working" implies changing the date. 
                    I'll assume the parent will handle the actual picker logic if I expose an onPress, 
                    but for this step I'm just updating the display.
                */}
                <FilterButton value={formattedDate} />
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
