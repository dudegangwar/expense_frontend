import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

interface InputProps extends TextInputProps {
    label: string;
}

export function Input({ label, style, ...props }: InputProps) {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.textInput, style]}
                {...props}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: "#555",
        marginBottom: 6,
    },
    textInput: {
        borderWidth: 1,
        borderColor: "#CCC",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: "#FFF",
        textAlignVertical: "top", // helpful for multiline
    },
});
