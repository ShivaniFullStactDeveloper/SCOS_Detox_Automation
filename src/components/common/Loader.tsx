
import React from "react";
import { View, ActivityIndicator, StyleSheet, Platform } from "react-native";

/**
 * Props for Loader component
 */
type Props = {
  size?: "small" | "large"; // Size of loader
  color?: string; // Loader color
};

/**
 * Loader Component
 * Displays a loading spinner
 * Used during API calls / screen loading
 */
const Loader: React.FC<Props> = ({
  size = "large",
  color = "#2F80ED", // Default blue color
}) => {
  return (
    <View style={styles.container}>
      
      {/* ================= LOADING SPINNER ================= */}
      <ActivityIndicator
        size={size}
        color={color}

        /**
         * Android Fix:
         * ActivityIndicator looks smaller on Android,
         * so we slightly scale it up
         */
        {...(Platform.OS === "android"
          ? { style: styles.androidFix }
          : {})}
      />

    </View>
  );
};

export default Loader;

/**
 * Styles
 */
const styles = StyleSheet.create({
  
  // Container for loader
  container: {
    marginTop: 10, // Space above loader
  },

  // Android-specific fix (increase size visually)
  androidFix: {
    transform: [{ scale: 1.2 }],
  },
});