import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    NativeScrollEvent,
    NativeSyntheticEvent,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const SLIDES = [
    {
        id: "1",
        title: "Track Your Spending",
        description: "Keep track of every penny you spend and manage your finances effortlessly.",
        image: require("@/assets/images/react-logo.png"), // Using placeholder for now, ideally use a better asset
    },
    {
        id: "2",
        title: "Analyze Your Habits",
        description: "Get detailed insights into your spending habits and save more money.",
        image: require("@/assets/images/react-logo.png"),
    },
    {
        id: "3",
        title: "Stay on Budget",
        description: "Set budgets for different categories and never overspend again.",
        image: require("@/assets/images/react-logo.png"),
    },
];

export default function OnboardingScreen() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const index = event.nativeEvent.contentOffset.x / slideSize;
        const roundIndex = Math.round(index);
        setCurrentIndex(roundIndex);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#0B0D12" />

            <View style={styles.sliderContainer}>
                <FlatList
                    ref={flatListRef}
                    data={SLIDES}
                    keyExtractor={(item) => item.id}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    renderItem={({ item }) => (
                        <View style={styles.slide}>
                            {/* Placeholder View for Image */}
                            <View style={styles.imagePlaceholder}>
                                <Text style={{ color: '#5E60CE', fontSize: 40, fontWeight: 'bold' }}>Xpen</Text>
                            </View>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.description}>{item.description}</Text>
                        </View>
                    )}
                />
            </View>

            <View style={styles.footer}>
                <View style={styles.pagination}>
                    {SLIDES.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                currentIndex === index && styles.activeDot,
                            ]}
                        />
                    ))}
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.primaryButton]}
                        onPress={() => router.push("/login")}
                    >
                        <Text style={styles.primaryButtonText}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.secondaryButton]}
                        onPress={() => router.push("/register")}
                    >
                        <Text style={styles.secondaryButtonText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0B0D12",
    },
    sliderContainer: {
        flex: 3,
        justifyContent: "center",
    },
    slide: {
        width,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 40,
    },
    imagePlaceholder: {
        width: 250,
        height: 250,
        backgroundColor: '#15171E',
        borderRadius: 125,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
        borderWidth: 2,
        borderColor: '#2A2C35',
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#fff",
        textAlign: "center",
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        color: "#A0A0A5",
        textAlign: "center",
        lineHeight: 24,
    },
    footer: {
        flex: 1,
        justifyContent: "space-between",
        paddingHorizontal: 24,
        paddingBottom: 24,
    },
    pagination: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#2A2C35",
        marginHorizontal: 4,
    },
    activeDot: {
        width: 24,
        height: 8,
        backgroundColor: "#5E60CE",
    },
    buttonContainer: {
        gap: 16,
    },
    button: {
        width: "100%",
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    primaryButton: {
        backgroundColor: "#5E60CE",
    },
    secondaryButton: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#5E60CE",
    },
    primaryButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    secondaryButtonText: {
        color: "#5E60CE",
        fontSize: 16,
        fontWeight: "600",
    },
});
