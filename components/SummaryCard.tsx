import api from "@/lib/api/api";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { IconSymbol } from "./ui/icon-symbol";

// Helper for the small internal cards
function MiniCard({ icon, label, amount, action, onPress }: { icon: string; label: string; amount?: string; action?: string; onPress?: () => void }) {
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
        <Text style={styles.miniValue}>{amount}</Text>
      ) : (
        <Text style={styles.miniAction}>{action}</Text>
      )}
    </TouchableOpacity>
  );
}

export function SummaryCard({ amountSum }: { amountSum: number }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [budgetAmount, setBudgetAmount] = useState("");

  const handleSave = async () => {
    console.log("Saving budget:", budgetAmount);
    try {
      const response = await api.post("/budgets", { amount: budgetAmount, month: `${new Date().getFullYear()}-${new Date().getMonth() + 1}` });
      console.log("Budget saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving budget:", error);
    }

    setModalVisible(false);
    setBudgetAmount("");
  };

  return (
    <LinearGradient
      colors={["#5E60CE", "#7B61FF"]} // Purple gradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Expenses This Month</Text>
        <IconSymbol name="ellipsis.circle" size={20} color="rgba(255,255,255,0.7)" />
      </View>

      <Text style={styles.totalAmount}>₹{amountSum}</Text>

      <View style={styles.row}>
        <MiniCard icon="arrow.up.right" label="Income - Month" amount="₹45.0K" />
        <View style={{ width: 12 }} />
        <MiniCard
          icon="creditcard.fill"
          label="Monthly Budget"
          action="Add Budget"
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
});