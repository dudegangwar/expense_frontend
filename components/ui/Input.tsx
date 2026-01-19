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
                    placeholderTextColor="#A0A0A5"
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
        color: "#fff",
        marginBottom: 6,
    },
    textInput: {
        borderWidth: 1,
        borderColor: "#2A2C35",
        borderRadius: 8,
        padding: 12,
        flex: 1,
        fontSize: 16,
        backgroundColor: "#15171E",
        color: "#fff",
        textAlignVertical: "top", // helpful for multiline
    },
    inputWrapper: {

        flexDirection: "row",
        alignItems: "center",
    },

});
