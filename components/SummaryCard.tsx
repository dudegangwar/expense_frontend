import api from "@/lib/api/api";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { IconSymbol } from "./ui/icon-symbol";

// Helper for the small internal cards
function MiniCard({ icon, label, amount, action, onPress, remainingAmount }: { icon: string; label: string; amount?: string; action?: string; onPress?: () => void, remainingAmount?: string }) {
  return (
    <TouchableOpacity style={styles.miniCard} onPress={onPress} disabled={!onPress}>
      <View style={styles.miniHeader}>
        <View style={styles.iconContainer}>
          {/* @ts-ignore */}
          <IconSymbol name={icon} size={16} color="#FFD700" />
        </View>
        <Text style={styles.miniLabel}>{label}</Text>
      </View>

      {amount ? (
        label === "Monthly Budget" ? (
          <View>
            <Text style={styles.remainingValue}>Left: ₹{remainingAmount}</Text>
            <Text style={styles.remainingValue}>Budget: ₹{amount}</Text>
          </View>
        ) : (
          <Text style={styles.miniValue}>₹{amount}</Text>
        )
      ) : (
        <Text style={styles.miniAction}>{action}</Text>
      )}
    </TouchableOpacity>
  );
}

export function SummaryCard({
  amountSum,
  incomeSum,
  selectedRange,
  onRangeChange,
}: {
  amountSum: number;
  incomeSum: number;
  selectedRange: string;
  onRangeChange: (range: string) => void;
}) {
  const [hasBudget, setHasBudget] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [budgetAmount, setBudgetAmount] = useState("");
  const [budgetId, setBudgetId] = useState("");

  const handleSave = async () => {
    // console.log("Saving budget:", budgetAmount);
    try {
      if (!hasBudget) {
        const response = await api.post("/budgets", { amount: budgetAmount, month: `${new Date().getFullYear()}-${new Date().getMonth() + 1}` });
        // console.log("Budget saved successfully:", response.data);
        setHasBudget(true);
      } else {
        const response = await api.put(`/budgets/${budgetId}`, { amount: budgetAmount });
        // console.log("Budget updated successfully:", response.data);
      }
    } catch (error) {
      // console.error("Error saving budget:", error);
    }

    setModalVisible(false);
  };

  const fetchBudget = async () => {
    try {
      const response = await api.get(`/budgets/by-month?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}`);
      // console.log("Budget fetched successfully:", response.data);
      // console.log("Month", `${new Date().getFullYear()}-${new Date().getMonth() + 1}`);
      if (response.data) {
        setBudgetAmount(response.data.amount.$numberDecimal);
        setBudgetId(response.data._id);
        setHasBudget(true);
      }
    } catch (error) {
      console.error("Error fetching budget:", error);
    }
  };

  useEffect(() => {
    fetchBudget();
  }, [hasBudget]);
  const remainingAmount = Number(budgetAmount) - amountSum;

  const ranges = ["Today", "This Week", "This Month", "This Year"];

  return (
    <LinearGradient
      colors={["#5E60CE", "#7B61FF"]} // Purple gradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Expenses {selectedRange}</Text>
        <View>
          <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)}>
            <IconSymbol
              name="ellipsis.circle"
              size={20}
              color="rgba(255,255,255,0.7)"
            />
          </TouchableOpacity>
          {dropdownVisible && (
            <View style={styles.dropdown}>
              {ranges.map((range) => (
                <TouchableOpacity
                  key={range}
                  style={styles.dropdownItem}
                  onPress={() => {
                    onRangeChange(range);
                    setDropdownVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.dropdownText,
                      selectedRange === range && styles.selectedDropdownText,
                    ]}
                  >
                    {range}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      <Text style={styles.totalAmount}>₹{amountSum}</Text>

      <View style={styles.row}>
        <MiniCard
          icon="arrow.up.right"
          label={`Income - ${selectedRange}`}
          amount={incomeSum.toFixed(2)}
        />
        <View style={{ width: 12 }} />
        <MiniCard
          icon="creditcard.fill"
          label="Monthly Budget"
          action="Add Budget"
          amount={budgetAmount}
          remainingAmount={remainingAmount.toFixed(2)}
          onPress={() => setModalVisible(true)}
        />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Set Monthly Budget</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter amount (e.g. 5000)"
              placeholderTextColor="#666"
              keyboardType="numeric"
              value={budgetAmount}
              onChangeText={setBudgetAmount}
              autoFocus
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSave}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 20,
    width: "100%",
    shadowColor: "#5E60CE",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    zIndex: 1000,
  },
  headerTitle: {
    color: "#E0E0E0",
    fontSize: 14,
    fontWeight: "500",
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
  },
  miniCard: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 16,
    padding: 12,
  },
  miniHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 6,
  },
  iconContainer: {
    // Optional: if we want a circle bg for icon
  },
  miniLabel: {
    color: "#E0E0E0",
    fontSize: 11,
    fontWeight: "500",
  },
  miniValue: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  miniAction: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    padding: 24,
    width: '80%',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#2C2C2C',
    borderRadius: 12,
    padding: 16,
    color: '#fff',
    fontSize: 16,
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',

  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#333',
  },
  saveButton: {
    backgroundColor: '#5E60CE',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  remainingValue: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  dropdown: {
    position: "absolute",
    top: 25,
    right: 0,
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    padding: 8,
    zIndex: 2000,
    width: 120,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  dropdownText: {
    color: "#A0A0A5",
    fontSize: 14,
    fontWeight: "500",
  },
  selectedDropdownText: {
    color: "#fff",
    fontWeight: "700",
  },
});