import { IconSymbol } from '@/components/ui/icon-symbol';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

interface EditProfileModalProps {
    visible: boolean;
    onClose: () => void;
    initialData: {
        full_name: string;
        email: string;
        phone_number: string;
    };
    onSave: (data: { full_name: string; email: string; phone_number: string }) => Promise<void>;
}

export function EditProfileModal({ visible, onClose, initialData, onSave }: EditProfileModalProps) {
    const [fullName, setFullName] = useState(initialData.full_name);
    const [email, setEmail] = useState(initialData.email);
    const [phoneNumber, setPhoneNumber] = useState(initialData.phone_number);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (visible) {
            setFullName(initialData.full_name || '');
            setEmail(initialData.email || '');
            setPhoneNumber(initialData.phone_number || '');
        }
    }, [visible, initialData]);

    const handleSave = async () => {
        try {
            setLoading(true);
            await onSave({ full_name: fullName, email, phone_number: phoneNumber });
            onClose();
        } catch (error) {
            // Error handling should be done in parent or here
            console.error('Failed to save profile', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.centeredView}
            >
                <View style={styles.modalView}>
                    <View style={styles.header}>
                        <Text style={styles.modalText}>Edit Profile</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            {/* @ts-ignore */}
                            <IconSymbol name="xmark.circle.fill" size={24} color="#A0A0A5" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.form}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Full Name</Text>
                            <TextInput
                                style={styles.input}
                                value={fullName}
                                onChangeText={setFullName}
                                placeholder="Enter full name"
                                placeholderTextColor="#555"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                                placeholder="Enter email"
                                placeholderTextColor="#555"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Phone Number</Text>
                            <TextInput
                                style={styles.input}
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                                placeholder="Enter phone number"
                                placeholderTextColor="#555"
                                keyboardType="phone-pad"
                            />
                        </View>
                    </ScrollView>

                    <View style={styles.activeButtonContainer}>
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleSave}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.textStyle}>Save Changes</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        backgroundColor: '#1C202F',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 24,
        width: '100%',
        maxHeight: '80%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    closeButton: {
        padding: 4,
    },
    modalText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    form: {
        marginBottom: 20,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        color: '#A0A0A5',
        fontSize: 14,
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        backgroundColor: '#15171E', // Darker input bg
        borderRadius: 12,
        padding: 14,
        color: '#fff',
        borderWidth: 1,
        borderColor: '#2A2C35',
        fontSize: 16,
    },
    activeButtonContainer: {
        marginTop: 10,
    },
    saveButton: {
        backgroundColor: '#5E60CE',
        borderRadius: 12,
        padding: 16,
        elevation: 2,
        alignItems: 'center',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
});
