import { IconSymbol } from '@/components/ui/icon-symbol';
import { useTheme } from '@/context/ThemeContext';
import { EditProfileModal } from '@/features/settings/EditProfileModal';
import { exportToCSV, exportToExcel } from '@/lib/exportData';
import { router, useFocusEffect } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import api from '../../../lib/api/api';

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
    theme: any;
}

function SettingItem({
    icon,
    iconColor,
    iconBackgroundColor,
    title,
    subtitle,
    type = 'link',
    value,
    onValueChange,
    onPress,
    destructive = false,
    theme
}: SettingItemProps) {
    const activeIconColor = iconColor || '#818CF8';
    const activeIconBg = iconBackgroundColor || theme.iconBackground;

    return (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={type !== 'toggle' ? onPress : undefined}
            activeOpacity={type !== 'toggle' ? 0.7 : 1}
            disabled={type === 'toggle'}
        >
            <View style={[styles.iconContainer, { backgroundColor: destructive ? theme.dangerBackground : activeIconBg }]}>
                {/* @ts-ignore: Symbol mappings are handled in IconSymbol */}
                <IconSymbol
                    name={icon as any}
                    size={22}
                    color={destructive ? theme.danger : activeIconColor}
                />
            </View>

            <View style={styles.textContainer}>
                <Text style={[styles.itemTitle, { color: theme.text }, destructive && { color: theme.danger }]}>{title}</Text>
                {subtitle && <Text style={[styles.itemSubtitle, { color: theme.textSecondary }]}>{subtitle}</Text>}
            </View>

            <View style={styles.actionContainer}>
                {type === 'toggle' && (
                    <Switch
                        trackColor={{ false: '#3e3e3e', true: theme.accent }}
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
                        color={theme.textSecondary}
                    />
                )}
            </View>
        </TouchableOpacity>
    );
}

function SettingSection({ title, children, theme }: { title: string, children: React.ReactNode, theme: any }) {
    return (
        <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>{title}</Text>
            <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
                {children}
            </View>
        </View>
    );
}

export default function SettingsScreen() {
    const { theme, isDarkMode, toggleTheme } = useTheme();
    const [notifications, setNotifications] = useState(true);

    // User State
    const [user, setUser] = useState<{ name: string; email: string; phone_number: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const fetchUser = async () => {
        try {
            setLoading(true);
            const res = await api.get('/users/me');
            setUser(res.data);
        } catch (error) {
            console.log('Error fetching user:', error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchUser();
        }, [])
    );

    const handleUpdateUser = async (updatedData: { name: string; email: string; phone_number: string }) => {
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

    const handleExportData = () => {
        Alert.alert(
            "Export Data",
            "Choose a format to export your data",
            [
                {
                    text: "Excel",
                    onPress: async () => {
                        try {
                            setLoading(true);
                            const res = await api.get('/expenses');
                            await exportToExcel(res.data, `expenses_${new Date().toISOString().split('T')[0]}`);
                        } catch (error) {
                            Alert.alert("Error", "Failed to export data");
                        } finally {
                            setLoading(false);
                        }
                    }
                },
                {
                    text: "CSV",
                    onPress: async () => {
                        try {
                            setLoading(true);
                            const res = await api.get('/expenses');
                            await exportToCSV(res.data, `expenses_${new Date().toISOString().split('T')[0]}`);
                        } catch (error) {
                            Alert.alert("Error", "Failed to export data");
                        } finally {
                            setLoading(false);
                        }
                    }
                },
                { text: "Cancel", style: "cancel" }
            ]
        );
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.background} />
            <View style={styles.header}>
                <Text style={[styles.headerTitle, { color: theme.text }]}>Settings</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Profile Card */}
                <View style={[styles.profileCard, { backgroundColor: theme.cardBackground }]}>
                    <View style={styles.profileHeader}>
                        <View style={styles.avatarContainer}>
                            {/* @ts-ignore */}
                            <IconSymbol name="person.circle.fill" size={48} color={theme.accent} />
                        </View>
                        <View style={styles.profileInfo}>
                            {loading && !user ? (
                                <ActivityIndicator color={theme.accent} />
                            ) : (
                                <>
                                    <Text style={[styles.profileName, { color: theme.text }]}>{user?.name || 'User'}</Text>
                                    <Text style={[styles.profileEmail, { color: theme.textSecondary }]}>{user?.email || 'email@example.com'}</Text>
                                </>
                            )}
                        </View>
                        <TouchableOpacity style={[styles.editButton, { backgroundColor: theme.iconBackground, borderColor: theme.border }]} onPress={() => setModalVisible(true)}>
                            <Text style={[styles.editButtonText, { color: theme.accent }]}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <SettingSection title="Appearance" theme={theme}>
                    <SettingItem
                        icon="moon.fill"
                        title="Dark Mode"
                        subtitle="Switch between light and dark theme"
                        type="toggle"
                        value={isDarkMode}
                        onValueChange={toggleTheme}
                        theme={theme}
                    />
                    <View style={[styles.separator, { backgroundColor: theme.border }]} />
                    <SettingItem
                        icon="bell.fill"
                        title="Notifications"
                        subtitle="Daily reminders for expense tracking"
                        type="toggle"
                        value={notifications}
                        onValueChange={setNotifications}
                        theme={theme}
                    />
                </SettingSection>

                <SettingSection title="Budget & Categories" theme={theme}>

                    <SettingItem
                        icon="square.grid.2x2.fill"
                        title="Manage Categories"
                        subtitle="Add, edit, or delete categories"
                        type="link"
                        onPress={() => { }}
                        theme={theme}
                    />
                    <View style={[styles.separator, { backgroundColor: theme.border }]} />
                    <SettingItem
                        icon="briefcase.fill"
                        title="Income Sources"
                        subtitle="Manage your income sources"
                        type="link"
                        onPress={() => { }}
                        theme={theme}
                    />
                </SettingSection>

                <SettingSection title="Data Management" theme={theme}>
                    <SettingItem
                        icon="arrow.down.doc.fill"
                        title="Export Data"
                        subtitle="Export your data as PDF or Excel"
                        type="link"
                        onPress={handleExportData}
                        theme={theme}
                    />
                    <View style={[styles.separator, { backgroundColor: theme.border }]} />
                    <SettingItem
                        icon="trash.fill"
                        title="Clear All Data"
                        subtitle="Delete all transactions & data"
                        type="action"
                        destructive
                        onPress={() => { }}
                        theme={theme}
                    />
                </SettingSection>

                <SettingSection title="Account" theme={theme}>
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
                        theme={theme}
                    />
                    <View style={[styles.separator, { backgroundColor: theme.border }]} />
                    <SettingItem
                        icon="trash.fill"
                        title="Delete Account"
                        subtitle="Permanently delete your account"
                        type="action"
                        destructive
                        onPress={handleDeleteAccount}
                        theme={theme}
                    />
                </SettingSection>

                <View style={[styles.infoCard, { backgroundColor: isDarkMode ? '#1C202F' : '#E5E5EA' }]}>
                    <Text style={[styles.infoTitle, { color: theme.text }]}>Xpen</Text>
                    <Text style={[styles.infoSubtitle, { color: theme.textSecondary }]}>Easy-Track Expenses & Budget with Powerful Analysis</Text>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>

            <EditProfileModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                initialData={{
                    name: user?.name || '',
                    email: user?.email || '',
                    phone_number: user?.phone_number || ''
                }}
                onSave={handleUpdateUser}
                theme={theme}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? 40 : 20,
        paddingBottom: 20,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: '700',
        fontFamily: Platform.select({ ios: 'System', android: 'sans-serif-medium' }),
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    profileCard: {
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
        marginBottom: 4,
    },
    profileEmail: {
        fontSize: 14,
    },
    editButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
    },
    editButtonText: {
        fontWeight: '600',
        fontSize: 14,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
        marginTop: 8,
    },
    card: {
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
        marginBottom: 4,
    },
    itemSubtitle: {
        fontSize: 13,
        lineHeight: 18,
    },
    actionContainer: {
        marginLeft: 8,
    },
    separator: {
        height: 1,
        marginLeft: 72, // Align with text start
    },
    infoCard: {
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 20,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    infoSubtitle: {
        fontSize: 14,
        textAlign: 'center',
    },
});
