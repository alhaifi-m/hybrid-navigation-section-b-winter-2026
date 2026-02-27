import {
  Alert,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
} from "react-native";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import React from "react";
import { router } from "expo-router";
import { theme } from "@/styles/theme";

// Define a Zod schema for the profile data

const profileSchema = z.object({
  firstName: z
    .string("first name must be a string")
    .trim()
    .min(3, "first name must be at least 3 characters"),
  lastName: z
    .string("last name must be a string")
    .trim()
    .min(3, "last name must be at least 3 characters"),
  email: z.email("invalid email address"),
  studentId: z
    .string("student ID must be a string")
    .trim()
    .min(7, "student ID must be at least 7 characters"),
  phone: z
    .string()
    .refine((val) => val.replace(/\D/g, ""), "phone number must be 10 digits"),
});

type ProfileForm = z.infer<typeof profileSchema>;

const Profile = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      studentId: "",
      phone: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = (data: ProfileForm) => {
    Alert.alert(
      "Profile Updated",
      `First Name: ${data.firstName}\nLast Name: ${data.lastName}\nEmail: ${data.email}\nStudent ID: ${data.studentId}\nPhone: ${data.phone}`,
      [{ text: "OK", onPress: () => router.back() }],
    );
  };
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.h1}>Edit Profile</Text>

      {/* First Name */}
      <Text style={styles.label}>First Name</Text>
      <Controller
        control={control}
        name="firstName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.firstName && styles.inputError]}
            placeholder="e.g Jane"
            placeholderTextColor={theme.colors.muted}
            value={value}
            onChangeText={onChange}
            autoCapitalize="words"
          />
        )}
      />
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  content: {
    padding: theme.spacing.screen,
  },
  h1: {
    fontSize: 22,
    fontWeight: "800",
    color: theme.colors.text,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.text,
    marginBottom: 6,
    marginTop: 16,
  },
  input: {
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.input,
    padding: 14,
    fontSize: 16,
    color: theme.colors.text,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
});
