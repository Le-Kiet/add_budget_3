import * as React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
//20521495_LeDinhTuanKiet

const Helps = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Help Screen</Text>
      <Text style={styles.content}>
        Welcome to the Help Screen! Here you can find useful information and
        instructions on how to use our app.
      </Text>
      <Text style={styles.sectionHeading}>Getting Started</Text>
      <Text style={styles.content}>
        To get started, make sure you have created an account and logged in. If
        you haven't, please visit the registration and login screens to create
        an account or sign in.
      </Text>
      <Text style={styles.sectionHeading}>Features</Text>
      <Text style={styles.subheading}>1. Profile</Text>
      <Text style={styles.content}>
        The profile screen allows you to view and edit your personal
        information. You can update your name, email, and profile picture from
        this screen.
      </Text>
      <Text style={styles.subheading}>2. Settings</Text>
      <Text style={styles.content}>
        The settings screen allows you to customize the app according to your
        preferences. You can change notification settings, app theme, and other
        options from this screen.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 12,
  },
  subheading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    marginBottom: 12,
  },
});

export default Helps;
