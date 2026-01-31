import api from "@/lib/api/api";
import { IExpenses } from "@/types";
import { create } from "zustand";

interface TransactionState {
  transactions: IExpenses[];
  loading: boolean;
  selectedRange: string;
  selectedMonth?: Date | null;
  isYearView?: boolean;
  setTransactions: (transactions: IExpenses[]) => void;
  setLoading: (loading: boolean) => void;
  setSelectedRange: (range: string) => void;
  setSelectedMonth: (date: Date | null) => void;
  setIsYearView: (val: boolean) => void;
  fetchTransactions: (options?: {
    range?: string;
    selectedMonth?: Date;
    isYearView?: boolean;
  }) => Promise<void>;
  clearTransactions: () => void;
  expenseType: "expense" | "income";
  setExpenseType: (expenseType: "expense" | "income") => void;
}

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [],
  loading: false,
  selectedRange: "This Month",
  selectedMonth: null,
  isYearView: false,
  setTransactions: (transactions) => set({ transactions }),
  setLoading: (loading) => set({ loading }),
  setSelectedRange: (range) => set({ selectedRange: range }),
  setSelectedMonth: (date) => set({ selectedMonth: date }),
  setIsYearView: (val) => set({ isYearView: val }),
  clearTransactions: () => set({ transactions: [] }),
  fetchTransactions: async (options) => {
    try {
      set({ loading: true });
      const now = new Date();
      let data: any[] = [];

      const range = options?.range ?? get().selectedRange;
      const selectedMonth = options?.selectedMonth ?? get().selectedMonth;
      const isYearView = options?.isYearView ?? get().isYearView;
      console.log("IsYearView:", isYearView);

      // Prioritize explicit range or year-view requests before honoring a globally set selectedMonth
      if (isYearView && selectedMonth) {
        // Year view scoped to the selectedMonth's year
        const response = await api.get("/expenses");
        data = response.data.filter(
          (t: IExpenses) =>
            new Date(t.expense_date).getFullYear() ===
            selectedMonth.getFullYear(),
        );
      } else if (range === "This Year") {
        const response = await api.get("/expenses");
        data = response.data.filter(
          (t: IExpenses) =>
            new Date(t.expense_date).getFullYear() === now.getFullYear(),
        );
      } else if (range === "This Month") {
        const response = await api.get(
          `/expenses/month/${now.getMonth() + 1}/${now.getFullYear()}`,
        );
        data = response.data;
      } else if (range === "Today") {
        const response = await api.get(
          `/expenses/month/${now.getMonth() + 1}/${now.getFullYear()}`,
        );
        data = response.data.filter((t: IExpenses) => {
          const d = new Date(t.expense_date);
          return (
            d.getDate() === now.getDate() &&
            d.getMonth() === now.getMonth() &&
            d.getFullYear() === now.getFullYear()
          );
        });
      } else if (range === "This Week") {
        const response = await api.get("/expenses");
        data = response.data;
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        startOfWeek.setHours(0, 0, 0, 0);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);
        data = data.filter((t: IExpenses) => {
          const tDate = new Date(t.expense_date);
          return tDate >= startOfWeek && tDate <= endOfWeek;
        });
      } else if (selectedMonth && !isYearView) {
        // If a specific month is set (and not in year view), fetch that month.
        const month = selectedMonth.getMonth() + 1;
        const year = selectedMonth.getFullYear();
        const response = await api.get(`/expenses/month/${month}/${year}`);
        data = response.data;
      } else {
        // Fallback: fetch all
        const response = await api.get("/expenses");
        data = response.data;
      }

      set({ transactions: data });
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    } finally {
      set({ loading: false });
    }
  },
  expenseType: "expense",
  setExpenseType: (expenseType) => set({ expenseType }),
}));
