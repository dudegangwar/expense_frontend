import { StyleSheet, Text, View } from 'react-native';

const THEME = {
    cardBackground: '#15171E',
    text: '#FFFFFF',
    accent: '#98FB98', // Pale Green
    progressBarBackground: '#2C3E34',
};

export function BudgetSummaryCard({ amount }: { amount: number }) {
    return (
        <View style={styles.budgetCard}>
            <Text style={styles.budgetLabel}>AVAILABLE BUDGET</Text>
            <Text style={styles.budgetValue}>{amount}</Text>

            <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: '0.5%' }]} />
            </View>

            <View style={styles.budgetLimits}>
                <Text style={styles.limitText}>₹50</Text>
                <Text style={styles.limitText}>₹10,000</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    budgetCard: {
        backgroundColor: THEME.cardBackground,
        borderRadius: 24,
        padding: 24,
        marginBottom: 32,
    },
    budgetLabel: {
        color: THEME.text,
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 0.5,
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    budgetValue: {
        color: THEME.text,
        fontSize: 32,
        fontWeight: '700',
        marginBottom: 20,
    },
    progressBarContainer: {
        height: 24,
        backgroundColor: THEME.progressBarBackground,
        borderRadius: 12,
        marginBottom: 8,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: THEME.accent,
        borderRadius: 12,
    },
    budgetLimits: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 4,
    },
    limitText: {
        color: THEME.text,
        fontSize: 12,
        fontWeight: '600',
    },
});
