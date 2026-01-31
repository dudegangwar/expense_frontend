import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import * as XLSX from 'xlsx';

export const exportToCSV = async (data: any[], filename: string = 'export') => {
    try {
        if (!data || data.length === 0) {
            console.warn('No data to export');
            return;
        }

        const header = Object.keys(data[0]).join(',');
        const csv = [
            header,
            ...data.map(row => Object.values(row).map(value => {
                if (typeof value === 'string') {
                    // Escape quotes and wrap in quotes if contains comma
                    const escaped = value.replace(/"/g, '""');
                    if (escaped.includes(',')) return `"${escaped}"`;
                    return escaped;
                }
                return value;
            }).join(','))
        ].join('\n');

        const uri = `${FileSystem.cacheDirectory}export_data.csv`;
        await FileSystem.writeAsStringAsync(uri, csv, {
            encoding: 'utf8',
        });

        if (await Sharing.isAvailableAsync()) {
            await Sharing.shareAsync(uri);
        } else {
            console.warn('Sharing is not available');
        }
    } catch (error) {
        console.error('Error exporting to CSV:', error);
        throw error;
    }
};

export const exportToExcel = async (data: any[], filename: string = 'export') => {
    try {
        if (!data || data.length === 0) {
            console.warn('No data to export');
            return;
        }

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Expenses");

        const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
        const uri = `${FileSystem.cacheDirectory}export_data.xlsx`;

        await FileSystem.writeAsStringAsync(uri, wbout, {
            encoding: 'base64',
        });

        if (await Sharing.isAvailableAsync()) {
            await Sharing.shareAsync(uri);
        } else {
            console.warn('Sharing is not available');
        }
    } catch (error) {
        console.error('Error exporting to Excel:', error);
        throw error;
    }
};
