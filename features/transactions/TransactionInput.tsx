import { Button } from "@/components/ui/Button";
import DateInput from "@/components/ui/DateInput";
import { DropdownInput } from "@/components/ui/DropdownInput";
import api, { Category, getCategories } from "@/lib/api/api";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Input } from "../../components/ui/Input";

function Form({ type }: { type: "income" | "expense" }) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const [selectedMood, setSelectedMood] = useState<string>("0");
  const [amount, setAmount] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const moodOptions = [
    { label: "Happy", value: "2" },
    { label: "Neutral", value: "0" },
    { label: "Sad", value: "-1" },
    { label: "Excited", value: "1" },
    { label: "Angry", value: "-2" },
  ];

  const submitTransaction = async () => {
    saveTransaction();
    router.back();
  };

  const submitTransactionAndAddAnother = async () => {
    saveTransaction();
    console.log("Transaction submitted");
  };
  const saveTransaction = async () => {
    try {
      const response = await api.post("/expenses", {
        amount: Number(amount),
        notes: notes,
        expense_date: date,
        category_id: selectedCategory,
        mood: Number(selectedMood),
        // type: type,
      });
      console.log("Transaction submitted:", response.data);
      Alert.alert("Transaction submitted successfully");
      setAmount("");
      setNotes("");
      setDate(new Date());
      setSelectedCategory("");
      setSelectedMood("0");
    } catch (error) {
      console.error("Failed to submit transaction:", error);
      Alert.alert("Failed to submit transaction");
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();

      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const categoryOptions = categories.map(cat => ({
    label: `${cat.icon} ${cat.name}`,
    value: cat.id,
  }));

  const onChange = (event: any, selectedDate: any) => {
    setOpen(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <View>
      <Input label="Amount" value={amount} onChangeText={setAmount} placeholder="Enter Amount" keyboardType="numeric" />
      <Input label="Notes" value={notes} onChangeText={setNotes} placeholder="Enter Notes" multiline numberOfLines={4} />
      <DateInput value={date} onChange={setDate} placeholder="Enter Date" />

      <DropdownInput
        label="Category"
        value={selectedCategory}
        options={categoryOptions}
        onSelect={setSelectedCategory}
        placeholder="Select Category"
      />

      <DropdownInput
        label="Mood"
        value={selectedMood}
        options={moodOptions}
        onSelect={setSelectedMood}
        placeholder="Select Mood"
      />
      <View style={styles.buttonContainer}>
        <Button style={styles.button} onPress={submitTransaction} >Save Transaction</Button>
        <Button style={styles.button} onPress={submitTransactionAndAddAnother} >Save & Add Another</Button>
      </View>
    </View>
  );
}
export { Form };

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
  },
  button: {
    width: "49%",
  },
  pickerInput: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#FFF",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});