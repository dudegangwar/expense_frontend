import { IconSymbol } from "@/components/ui/icon-symbol";
import { useTheme } from "@/context/ThemeContext";
import { StyleSheet, TextInput, View } from "react-native";

interface SearchBarProps {
    value?: string;
    onChangeText?: (text: string) => void;
}

export function SearchBar({ value, onChangeText }: SearchBarProps) {
    const { theme } = useTheme();
    return (
        <View style={[styles.container, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
            <View style={styles.iconBefore}>
                {/* @ts-ignore */}
                <IconSymbol name="magnifyingglass" size={20} color={theme.textSecondary} />
            </View>
            <TextInput
                style={[styles.input, { color: theme.text }]}
                placeholder="Search transactions..."
                placeholderTextColor={theme.textSecondary}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#15171E",
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 48,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#2A2C35",
    },
    iconBefore: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        color: "#fff",
        fontSize: 14,
        height: "100%", // maximize text input hit area
    },
});
