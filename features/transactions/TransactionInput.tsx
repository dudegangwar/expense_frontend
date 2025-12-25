import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input } from "../../components/ui/Input";

function PickerInput({ label }: { label: string }) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerInput}>
        <Text>{label}</Text>
      </View>
    </View>
  );
}

function Form() {
  return (
    <View>
      <Input label="Amount" value="500" />
      <Input label="Title" value="Gym Membership" />
      <Input
        label="Description"
        value="Paid gym membership fees for March 2023"
        multiline
      />
      <PickerInput label="Thu, 16 Mar, 2023 @ 08:55 am" />
      <PickerInput label="Bank" />
      <PickerInput label="Health" />
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
  pickerInput: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#FFF",
  },
});