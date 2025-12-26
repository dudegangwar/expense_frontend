import { IconSymbol } from '@/components/ui/icon-symbol';
import api, { Category, getCategories } from '@/lib/api/api';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { BudgetSummaryCard } from './components/BudgetSummaryCard';
import { CategoryItem } from './components/CategoryItem';

const THEME = {
    background: '#0B0D12',
    text: '#FFFFFF',
    textSecondary: '#A0A0A5',
    accent: '#98FB98',
};

export default function BudgetScreen() {
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
    const [budget, setBudget] = useState<number>(0);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
        fetchBudget();
    }, []);

    const fetchBudget = async () => {
        try {
            const response = await api.get(`/budgets/by-month?month=${selectedMonth}`);
            console.log("Budget fetched successfully:", response.data.amount.$numberDecimal);
            setBudget(response.data.amount.$numberDecimal);
        } catch (error) {
            console.error("Error fetching budget:", error);
        }

    };

    const fetchCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={THEME.background} />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back-sharp" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Budgets</Text>
                </View>
                <TouchableOpacity style={styles.monthSelector}>
                    <Text style={styles.monthText}>{selectedMonth}</Text>
                    <IconSymbol name="chevron.down" size={16} color={THEME.accent} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <BudgetSummaryCard amount={budget} />

                <Text style={styles.sectionTitle}>Categories</Text>

                {/* Categories List */}
                {loading ? (
                    <Text style={{ color: THEME.textSecondary }}>Loading...</Text>
                ) : (
                    categories.map((category) => (
                        <CategoryItem
                            key={category.name}
                            icon={category.icon}
                            title={category.name}
                            subtitle={`${category.type} category`} // Placeholder subtitle
                            budget={category.monthly_budget ? `₹${category.monthly_budget}` : "Not Set"}
                            spent="₹0" // Placeholder
                            available={category.monthly_budget ? `₹${category.monthly_budget}` : "₹0"} // Placeholder calculation
                            isSet={!!category.monthly_budget}
                        />
                    ))
                )}

                <View style={{ height: 20 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? 20 : 10,
        paddingBottom: 20,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    backButton: {
        padding: 4,
        marginLeft: -4,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: THEME.text,
    },
    monthSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: '#1E2D24', // Subtle background
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    monthText: {
        color: THEME.accent,
        fontSize: 14,
        fontWeight: '600',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: THEME.text,
        marginBottom: 16,
    },
});
