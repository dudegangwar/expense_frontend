import { IconSymbol } from '@/components/ui/icon-symbol';
import { EditProfileModal } from '@/features/settings/EditProfileModal';
import { router, useFocusEffect } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import api from '../../../lib/api/api';

// Theme Constants matching the screenshot
const THEME = {
    background: '#0B0D12', // Very dark background
    cardBackground: '#15171E', // Slightly lighter card background
    text: '#FFFFFF',
    textSecondary: '#A0A0A5',
    accent: '#5E60CE', // Purple for toggles
    iconBackground: '#1E2029', // Dark gray/blue for icon containers
    danger: '#FF453A', // Red for delete
    dangerBackground: '#2C1517', // Dark red bg for delete icon
};

interface SettingItemProps {
    icon: string;
    iconColor?: string;
    iconBackgroundColor?: string;
    title: string;
    subtitle?: string;
    type?: 'toggle' | 'link' | 'action';
    value?: boolean;
    onValueChange?: (val: boolean) => void;
    onPress?: () => void;
    destructive?: boolean;
}

function SettingItem({
    icon,
    iconColor = '#818CF8',
    iconBackgroundColor = THEME.iconBackground,
    title,
    subtitle,
    type = 'link',
    value,
    onValueChange,
    onPress,
    destructive = false
}: SettingItemProps) {
    return (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={type !== 'toggle' ? onPress : undefined}
            activeOpacity={type !== 'toggle' ? 0.7 : 1}
            disabled={type === 'toggle'}
        >
            <View style={[styles.iconContainer, { backgroundColor: destructive ? THEME.dangerBackground : iconBackgroundColor }]}>
                {/* @ts-ignore: Symbol mappings are handled in IconSymbol */}
                <IconSymbol
                    name={icon as any}
                    size={22}
                    color={destructive ? THEME.danger : iconColor}
                />
            </View>

            <View style={styles.textContainer}>
                <Text style={[styles.itemTitle, destructive && { color: THEME.danger }]}>{title}</Text>
                {subtitle && <Text style={styles.itemSubtitle}>{subtitle}</Text>}
            </View>

            <View style={styles.actionContainer}>
                {type === 'toggle' && (
                    <Switch
                        trackColor={{ false: '#3e3e3e', true: THEME.accent }}
                        thumbColor={'#fff'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={onValueChange}
                        value={value}
                    />
                )}
                {(type === 'link' || type === 'action') && (
                    <IconSymbol
                        name="chevron.right"
                        size={20}
                        color={THEME.textSecondary}
                    />
                )}
            </View>
        </TouchableOpacity>
    );
}

function SettingSection({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <View style={styles.card}>
                {children}
            </View>
        </View>
    );
}

export default function SettingsScreen() {
    const [darkMode, setDarkMode] = useState(true);
    const [notifications, setNotifications] = useState(true);

    // User State
    const [user, setUser] = useState<{ full_name: string; email: string; phone_number: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const fetchUser = async () => {
        try {
            setLoading(true);
            const res = await api.get('/users/me');
            setUser(res.data);
        } catch (error) {
            console.log('Error fetching user:', error);
            // Optionally handle 401 logout if needed, but interceptor might handle it ? 
            // Currently simple log.
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchUser();
        }, [])
    );

    const handleUpdateUser = async (updatedData: { full_name: string; email: string; phone_number: string }) => {
        try {
            const res = await api.put('/users/me', updatedData);
            setUser(res.data); // Update local state with response
            Alert.alert("Success", "Profile updated successfully");
        } catch (error) {
            console.log('Error updating user:', error);
            Alert.alert("Error", "Failed to update profile");
            throw error; // Re-throw for modal to handle loading state/error
        }
    };

    const handleDeleteAccount = async () => {
        Alert.alert(
            "Delete Account",
            "Are you sure you want to delete your account? This action cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await api.delete('/users/me');
                            await SecureStore.deleteItemAsync('token');
                            router.replace('/');
                        } catch (error) {
                            console.log('Error deleting account:', error);
                            Alert.alert("Error", "Failed to delete account");
                        }
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={THEME.background} />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Settings</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Profile Card */}
                <View style={styles.profileCard}>
                    <View style={styles.profileHeader}>
                        <View style={styles.avatarContainer}>
                            {/* @ts-ignore */}
                            <IconSymbol name="person.circle.fill" size={48} color={THEME.accent} />
                        </View>
                        <View style={styles.profileInfo}>
                            {loading && !user ? (
                                <ActivityIndicator color={THEME.accent} />
                            ) : (
                                <>
                                    <Text style={styles.profileName}>{user?.full_name || 'User'}</Text>
                                    <Text style={styles.profileEmail}>{user?.email || 'email@example.com'}</Text>
                                </>
                            )}
                        </View>
                        <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
                            <Text style={styles.editButtonText}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <SettingSection title="Appearance">
                    <SettingItem
                        icon="moon.fill"
                        title="Dark Mode"
                        subtitle="Switch between light and dark theme"
                        type="toggle"
                        value={darkMode}
                        onValueChange={setDarkMode}
                    />
                    <View style={styles.separator} />
                    <SettingItem
                        icon="bell.fill"
                        title="Notifications"
                        subtitle="Daily reminders for expense tracking"
                        type="toggle"
                        value={notifications}
                        onValueChange={setNotifications}
                    />
                </SettingSection>

                <SettingSection title="Budget & Categories">
                    <SettingItem
                        icon="creditcard.fill"
                        title="Monthly Budget"
                        subtitle="Set your monthly budget"
                        type="link"
                        onPress={() => { }}
                    />
                    <View style={styles.separator} />
                    <SettingItem
                        icon="square.grid.2x2.fill"
                        title="Manage Categories"
                        subtitle="Add, edit, or delete categories"
                        type="link"
                        onPress={() => { }}
                    />
                    <View style={styles.separator} />
                    <SettingItem
                        icon="briefcase.fill"
                        title="Income Sources"
                        subtitle="Manage your income sources"
                        type="link"
                        onPress={() => { }}
                    />
                </SettingSection>

                <SettingSection title="Data Management">
                    <SettingItem
                        icon="arrow.down.doc.fill"
                        title="Export Data"
                        subtitle="Export your data as PDF or Excel"
                        type="link"
                        onPress={() => { }}
                    />
                    <View style={styles.separator} />
                    <SettingItem
                        icon="trash.fill"
                        title="Clear All Data"
                        subtitle="Delete all transactions & data"
                        type="action"
                        destructive
                        onPress={() => { }}
                    />
                </SettingSection>

                <SettingSection title="Account">
                    <SettingItem
                        icon="arrow.right.circle.fill"
                        title="Log Out"
                        subtitle="Sign out of your account"
                        type="action"
                        destructive
                        onPress={async () => {
                            await SecureStore.deleteItemAsync('token');
                            router.replace('/');
                        }}
                    />
                    <View style={styles.separator} />
                    <SettingItem
                        icon="trash.fill"
                        title="Delete Account"
                        subtitle="Permanently delete your account"
                        type="action"
                        destructive
                        onPress={handleDeleteAccount}
                    />
                </SettingSection>

                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>Xpen</Text>
                    <Text style={styles.infoSubtitle}>Easy-Track Expenses & Budget with Powerful Analysis</Text>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>

            <EditProfileModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                initialData={{
                    full_name: user?.full_name || '',
                    email: user?.email || '',
                    phone_number: user?.phone_number || ''
                }}
                onSave={handleUpdateUser}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.background,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? 40 : 20,
        paddingBottom: 20,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: '700',
        color: THEME.text,
        fontFamily: Platform.select({ ios: 'System', android: 'sans-serif-medium' }),
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    profileCard: {
        backgroundColor: THEME.cardBackground,
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        marginRight: 16,
    },
    profileInfo: {
        flex: 1,
    },
    profileName: {
        fontSize: 18,
        fontWeight: '700',
        color: THEME.text,
        marginBottom: 4,
    },
    profileEmail: {
        fontSize: 14,
        color: THEME.textSecondary,
    },
    editButton: {
        backgroundColor: '#1E2029',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#2A2C35',
    },
    editButtonText: {
        color: THEME.accent,
        fontWeight: '600',
        fontSize: 14,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: THEME.text,
        marginBottom: 12,
        marginTop: 8,
    },
    card: {
        backgroundColor: THEME.cardBackground,
        borderRadius: 16,
        paddingVertical: 4,
        overflow: 'hidden',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: THEME.text,
        marginBottom: 4,
    },
    itemSubtitle: {
        fontSize: 13,
        color: THEME.textSecondary,
        lineHeight: 18,
    },
    actionContainer: {
        marginLeft: 8,
    },
    separator: {
        height: 1,
        backgroundColor: '#2A2C35', // Subtle separator
        marginLeft: 72, // Align with text start
    },
    infoCard: {
        backgroundColor: '#1C202F', // Slightly different shade
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 20,
    },
    infoTitle: {
        color: '#E0E0E0',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    infoSubtitle: {
        color: '#8A8F98',
        fontSize: 14,
        textAlign: 'center',
    },
});
