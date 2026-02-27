import { StyleSheet, Text, View } from 'react-native'
import { z } from "zod";
import React from 'react'


// Define a Zod schema for the profile data

const profileSchema = z.object({
    firstName: z.string("first name must be a string").trim().min(3, "first name must be at least 3 characters"),
    lastName: z.string("last name must be a string").trim().min(3, "last name must be at least 3 characters"),
    email: z.email("invalid email address"),
    studentId: z.string("student ID must be a string").trim().min(7, "student ID must be at least 7 characters"),
    phone: z.string().refine((val) => val.replace(/\D/g,""), "phone number must be 10 digits")
})

type ProfileData = z.infer<typeof profileSchema>;

const Profile = () => {
  return (
    <View>
      <Text>profile</Text>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})