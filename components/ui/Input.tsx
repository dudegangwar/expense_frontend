import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

interface InputProps extends TextInputProps {
    label: string;
    icon?: React.ReactNode;
}

export function Input({ label, style, icon, ...props }: InputProps) {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputWrapper}>
                <TextInput
                    style={[styles.textInput, style]}
                    {...props}
                />
                {icon && icon}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 16,
        // flex: 1,
        width: '100%',
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
        flex: 1,
        fontSize: 16,
        backgroundColor: "#FFF",
        textAlignVertical: "top", // helpful for multiline
    },
    inputWrapper: {

        flexDirection: "row",
        alignItems: "center",
    },

});
