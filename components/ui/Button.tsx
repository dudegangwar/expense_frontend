import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "ghost";
}

export function Button({ children, style, variant = "primary", ...props }: ButtonProps) {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                variant === "ghost" && styles.ghostButton,
                style
            ]}
            {...props}
        >
            <Text style={[styles.text, variant === "ghost" && styles.ghostText]}>
                {children}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 12,
        borderRadius: 8,
        width: "100%",
        alignItems: "center",
        backgroundColor: "#007AFF",
    },
    ghostButton: {
        backgroundColor: "transparent",
    },
    text: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
    ghostText: {
        color: "#007AFF",
    },
});
