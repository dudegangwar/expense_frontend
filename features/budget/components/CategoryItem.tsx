import { IconSymbol } from '@/components/ui/icon-symbol';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const THEME = {
    cardBackground: '#15171E',
    text: '#FFFFFF',
    textSecondary: '#A0A0A5',
    accent: '#98FB98',
    accentDark: '#1E2D24',
};

interface CategoryItemProps {
    icon: string;
    title: string;
    subtitle: string;
    budget: string;
    spent: string;
    available: string;
    isSet: boolean;
}

export function CategoryItem({
    icon,
    title,
    subtitle,
    budget,
    spent,
    available,
    isSet,
}: CategoryItemProps) {
    return (
        <View style={styles.categoryCard}>
            <View style={styles.categoryHeader}>
                <View style={styles.iconTitleContainer}>
                    <View style={styles.iconContainer}>
                        {/* @ts-ignore */}
                        <IconSymbol name={icon as any} size={24} color={THEME.accentDark} />
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.categoryTitle}>{title}</Text>
                        <Text style={styles.categorySubtitle} numberOfLines={2}>
                            {subtitle}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>{isSet ? 'EDIT' : 'SET'}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Budget</Text>
                    <Text style={[styles.statValue, !isSet && styles.notSetText]}>
                        {budget}
                    </Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Spent</Text>
                    <Text style={styles.statValue}>{spent}</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Available</Text>
                    <Text style={styles.statValue}>{available}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    categoryCard: {
        backgroundColor: THEME.cardBackground,
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
    },
    categoryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 24,
    },
    iconTitleContainer: {
        flexDirection: 'row',
        flex: 1,
        marginRight: 12,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: THEME.accent,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    titleContainer: {
        flex: 1,
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: THEME.text,
        marginBottom: 4,
    },
    categorySubtitle: {
        fontSize: 12,
        color: THEME.textSecondary,
        lineHeight: 16,
    },
    actionButton: {
        backgroundColor: THEME.accent,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },
    actionButtonText: {
        color: THEME.accentDark,
        fontSize: 12,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statItem: {
        flex: 1,
    },
    statLabel: {
        fontSize: 12,
        color: THEME.textSecondary,
        marginBottom: 4,
    },
    statValue: {
        fontSize: 16,
        fontWeight: '700',
        color: THEME.text,
    },
    notSetText: {
        color: THEME.text,
    },
});
