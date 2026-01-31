import { useTheme } from "@/context/ThemeContext";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface ToggleProps {
    label: string;
    active: boolean;
    onPress: () => void;
    activeColor?: string;
    inactiveColor?: string;
}

export function Toggle({
    label,
    active,
    onPress,
    activeColor = "#4CAF50", // Default active color
    inactiveColor
}: ToggleProps) {
    const { theme } = useTheme();
    const resolvedInactiveColor = inactiveColor || theme.iconBackground;

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.toggleButton,
                { backgroundColor: active ? activeColor : resolvedInactiveColor },
            ]}
        >
            <Text style={[styles.toggleText, { color: theme.textSecondary }, active && { color: "#fff" }]}>
                {label}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    toggleButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        marginHorizontal: 4,
        alignItems: "center",
    },
    toggleText: {
        fontWeight: "600",
        color: "#A0A0A5",
    },
});
