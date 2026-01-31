import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons'; // Expo
import RNDateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Input } from './Input';
// import Icon from 'react-native-vector-icons/Ionicons'; // CLI

export default function DateInput({ value, onChange, placeholder }: { value: Date; onChange: (value: Date) => void; placeholder: string }) {
    const { theme } = useTheme();
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState(value || new Date());

    return (
        <>
            <View style={styles.container}>
                <Input style={styles.input}
                    value={value.toDateString()}
                    placeholder={placeholder}
                    editable={false} // optional if opening date picker
                    label={'Enter Date'}
                    icon={<TouchableOpacity style={styles.icon} onPress={() => setOpen(true)}>
                        <Ionicons name="calendar-outline" size={22} color={theme.textSecondary} />
                    </TouchableOpacity>} />
            </View>
            {open && <RNDateTimePicker value={date} onChange={(event, selectedDate) => {
                setOpen(false);
                if (selectedDate) {
                    setDate(selectedDate);
                    onChange(selectedDate);
                }
            }} />}
        </>

    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        width: '100%',
        // paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        height: 45,
        width: '100%',
    },
    icon: {
        paddingLeft: 8,
        position: 'absolute',
        right: 8,
    },
});
