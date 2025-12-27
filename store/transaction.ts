import { IExpenses } from '@/types';
import { create } from 'zustand';

interface TransactionState {
    transactions: IExpenses[];
    setTransactions: (transactions: IExpenses[]) => void;
    expenseType: "expense" | "income";
    setExpenseType: (expenseType: "expense" | "income") => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
    transactions: [],
    setTransactions: (transactions) => set({ transactions }),
    expenseType: "expense",
    setExpenseType: (expenseType) => set({ expenseType }),
}))
