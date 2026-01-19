import { IconSymbol } from '@/components/ui/icon-symbol';
import React, { useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Option {
    label: string;
    value: string;
    icon?: string;
}

interface DropdownInputProps {
    label: string;
    value?: string;
    options: Option[];
    onSelect: (value: string) => void;
    placeholder?: string;
}

export function DropdownInput({ label, value, options, onSelect, placeholder = "Select option" }: DropdownInputProps) {
    const [visible, setVisible] = useState(false);

    const selectedOption = options.find(opt => opt.value === value);

    const handleSelect = (val: string) => {
        onSelect(val);
        setVisible(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity style={styles.trigger} onPress={() => setVisible(true)}>
                <Text style={[styles.valueText, !selectedOption && styles.placeholder]}>
                    {selectedOption ? selectedOption.label : placeholder}
                </Text>
                <IconSymbol name="chevron.down" size={16} color="#A0A0A5" />
            </TouchableOpacity>

            <Modal
                visible={visible}
                transparent
                animationType="fade"
                onRequestClose={() => setVisible(false)}
            >
                <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setVisible(false)}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select {label}</Text>
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.optionItem,
                                        item.value === value && styles.selectedOption
                                    ]}
                                    onPress={() => handleSelect(item.value)}
                                >
                                    <View style={styles.optionContent}>
                                        {item.icon && (
                                            <View style={styles.iconContainer}>
                                                {/* @ts-ignore */}
                                                <IconSymbol name={item.icon} size={20} color={item.value === value ? "#fff" : "#A0A0A5"} />
                                            </View>
                                        )}
                                        <Text style={[
                                            styles.optionText,
                                            item.value === value && styles.selectedOptionText
                                        ]}>
                                            {item.label}
                                        </Text>
                                    </View>
                                    {item.value === value && (
                                        <IconSymbol name="checkmark" size={20} color="#fff" />
                                    )}
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: "#fff",
        marginBottom: 6,
        fontWeight: '500',
    },
    trigger: {
        borderWidth: 1,
        borderColor: "#2A2C35",
        borderRadius: 8,
        padding: 12,
        backgroundColor: "#15171E",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    valueText: {
        fontSize: 16,
        color: "#fff",
    },
    placeholder: {
        color: "#A0A0A5",
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: '#1E2029',
        borderRadius: 16,
        padding: 20,
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
        textAlign: 'center',
        color: "#fff",
    },
    optionItem: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    selectedOption: {
        backgroundColor: '#5E60CE',
    },
    optionContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconContainer: {
        width: 24,
        alignItems: 'center',
    },
    optionText: {
        fontSize: 16,
        color: '#fff',
    },
    selectedOptionText: {
        color: '#fff',
        fontWeight: '500',
    },
});
