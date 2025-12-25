import { IconSymbol } from "@/components/ui/icon-symbol";
import { router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as SecureStore from "expo-secure-store";
import api from "../lib/api/api";

export default function RegisterScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!name || !email || !password || !phoneNumber) {
            Alert.alert("Error", "All fields are required");
            return;
        }

        try {
            setLoading(true);
            console.log("Attempting register with:", email);

            // 1. Register
            const registerRes = await api.post("/users/register", {
                full_name: name, // Assuming API expects full_name, though prompt said "email", "password", "currency_code", "phone_number". Adjusting to prompt.
                email,
                password,
                phone_number: phoneNumber,
                currency_code: "INR" // Defaulting to INR as per screenshots
            });

            console.log("Registration successful", registerRes.data);

            // 2. Login automatically (optional, but good UX)
            // Assuming register API might return token or we need to login explicitly. 
            // Safest is to login explicitly layout.

            const loginRes = await api.post("/users/login", {
                email,
                password
            });

            const token = loginRes.data.access_token;
            await SecureStore.setItemAsync("token", token);

            Alert.alert("Success", "Account created successfully!");
            router.replace("/(tabs)/dashboard");

        } catch (err: any) {
            Alert.alert(
                "Registration failed",
                err?.response?.data?.error || "Could not create account"
            );
            console.log("Register error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#0B0D12" />

            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                {/* @ts-ignore */}
                <IconSymbol name="chevron.left" size={24} color="#fff" />
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Join us to start managing your budget</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Full Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="John Doe"
                            placeholderTextColor="#555"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="john@example.com"
                            placeholderTextColor="#555"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Phone Number</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="+91 9876543210"
                            placeholderTextColor="#555"
                            keyboardType="phone-pad"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Create a password"
                            placeholderTextColor="#555"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleRegister}
                        disabled={loading}
                    >
                        <Text style={styles.buttonText}>
                            {loading ? "Creating Account..." : "Register"}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => router.push("/login")}>
                        <Text style={styles.linkText}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ height: 30 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0B0D12",
        paddingHorizontal: 24,
        paddingTop: 10,
    },
    backButton: {
        marginBottom: 20,
        marginTop: 10,
    },
    header: {
        marginBottom: 30,
    },
    title: {
        fontSize: 32,
        fontWeight: "700",
        color: "#fff",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: "#A0A0A5",
    },
    form: {
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        color: "#E0E0E0",
        fontSize: 14,
        marginBottom: 8,
        fontWeight: "500",
    },
    input: {
        backgroundColor: "#15171E",
        borderWidth: 1,
        borderColor: "#2A2C35",
        padding: 16,
        borderRadius: 12,
        color: "#fff",
        fontSize: 16,
    },
    button: {
        backgroundColor: "#5E60CE",
        padding: 16,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 5,
        marginTop: 10,
    },
    footerText: {
        color: "#A0A0A5",
        fontSize: 14,
    },
    linkText: {
        color: "#5E60CE",
        fontWeight: '600',
        fontSize: 14,
    }
});
