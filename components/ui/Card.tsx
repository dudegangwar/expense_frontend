import { StyleSheet, View, ViewProps } from "react-native";

interface CardProps extends ViewProps {
    children: React.ReactNode;
}

export function Card({ children, style, ...props }: CardProps) {
    return (
        <View style={[styles.card, style]} {...props}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        // Add shadow or other common card styles if needed, 
        // but SummaryCard had simpler styles, mostly background and radius.
    },
});
