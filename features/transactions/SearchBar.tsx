import { IconSymbol } from "@/components/ui/icon-symbol";
import { StyleSheet, TextInput, View } from "react-native";

export function SearchBar() {
    return (
        <View style={styles.container}>
            <View style={styles.iconBefore}>
                {/* @ts-ignore */}
                <IconSymbol name="magnifyingglass" size={20} color="#A0A0A5" />
            </View>
            <TextInput
                style={styles.input}
                placeholder="Search transactions..."
                placeholderTextColor="#A0A0A5"
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
