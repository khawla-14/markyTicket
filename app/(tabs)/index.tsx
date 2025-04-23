import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { router } from "expo-router";

const tutorialSteps = [
  {
    title: "Welcome to MARKY TICKETS",
    description: "Your journey begins here. Book bus tickets with ease.",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071",
  },
  {
    title: "Discover Places",
    description: "Explore amazing destinations and plan your next adventure.",
    image: "https://images.unsplash.com/photo-1610555356070-d0efb6505f81?q=80&w=2070",
  },
  {
    title: "Easy Booking",
    description: "Book your tickets in just a few taps.",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
  },
];

export const Tutorial = ({ onComplete }: { onComplete: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push("./signin");
    }
  };

  return (
    <ImageBackground
      source={{ uri: tutorialSteps[currentStep].image }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.gradientOverlay} />
        <View style={styles.content}>
          <Text style={styles.title}>{tutorialSteps[currentStep].title}</Text>
          <Text style={styles.description}>{tutorialSteps[currentStep].description}</Text>

          <View style={styles.progressContainer}>
            {tutorialSteps.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      index === currentStep ? "#075eec" : "rgba(255, 255, 255, 0.5)",
                  },
                ]}
              />
            ))}
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={() => router.push("./explore")}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>
                {currentStep === tutorialSteps.length - 1 ? "Get Started" : "Next"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // darker overlay for better contrast
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)", // helps with readability
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 12,
    textShadowColor: "rgba(0, 0, 0, 0.6)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  description: {
    fontSize: 18,
    color: "#f1f1f1",
    marginBottom: 24,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  skipText: {
    color: "#f0f0f0",
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: "#075eec",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Tutorial;
