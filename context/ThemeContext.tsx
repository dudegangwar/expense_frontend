import * as SecureStore from 'expo-secure-store';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

// Define Theme Interface
export interface ThemeColors {
    background: string;
    cardBackground: string;
    text: string;
    textSecondary: string;
    accent: string;
    iconBackground: string;
    danger: string;
    dangerBackground: string;
    border: string;
    inputBackground: string;
    tabBarBackground: string;
}

export const lightTheme: ThemeColors = {
    background: '#F2F2F7',
    cardBackground: '#FFFFFF',
    text: '#000000',
    textSecondary: '#8A8A8E',
    accent: '#5E60CE',
    iconBackground: '#F0F0F5',
    danger: '#FF3B30',
    dangerBackground: '#FFEBEE',
    border: '#C6C6C8',
    inputBackground: '#FFFFFF',
    tabBarBackground: '#FFFFFF',
};

export const darkTheme: ThemeColors = {
    background: '#0B0D12',
    cardBackground: '#15171E',
    text: '#FFFFFF',
    textSecondary: '#A0A0A5',
    accent: '#5E60CE',
    iconBackground: '#1E2029',
    danger: '#FF453A',
    dangerBackground: '#2C1517',
    border: '#2A2C35',
    inputBackground: '#15171E',
    tabBarBackground: '#15171E',
};

interface ThemeContextType {
    theme: ThemeColors;
    isDarkMode: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const systemColorScheme = useColorScheme();
    const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode as per original design

    useEffect(() => {
        // Load saved theme preference
        const loadTheme = async () => {
            const savedTheme = await SecureStore.getItemAsync('theme_preference');
            if (savedTheme) {
                setIsDarkMode(savedTheme === 'dark');
            } else {
                // If no preference, stick to default (Dark) or respect system? 
                // Let's stick to default Dark as per current app style, or user can toggle.
            }
        };
        loadTheme();
    }, []);

    const toggleTheme = async () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        await SecureStore.setItemAsync('theme_preference', newMode ? 'dark' : 'light');
    };

    const theme = isDarkMode ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
