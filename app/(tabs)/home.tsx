import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import AppCard from "@/components/app-card";
import { theme } from "@/styles/theme";
import * as api from "@/lib/api";

const Home = () => {
  const [data, setData] = useState<api.DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // reusable fetch function

  async function loadDashboard() {
    try {
      setError(null);
      setIsLoading(true);
      const result = await api.getDashboard();
      setData(result);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went Wrong");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  if(isLoading){
    return (
      <View style={styles.centered}>
        <ActivityIndicator size={"large"} color={theme.colors.primary}/>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Campus Hub</Text>
      <Text style={styles.p}>Quick Overview for Today</Text>
      <AppCard
        title="Upcoming Deadline"
        subtitle="CPRG-216 Assignment due Friday"
        right={
          <Ionicons
            name="alert-circle-outline"
            size={22}
            color={theme.colors.primary}
          />
        }
      />
      <AppCard
        title="Attendance"
        subtitle="You attended 3/4 classes this week"
        right={
          <Ionicons
            name="checkmark-circle-outline"
            size={22}
            color={theme.colors.primary}
          />
        }
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.screen,
    backgroundColor: theme.colors.bg,
  },
  centered: {
    flex: 1,
    padding: theme.spacing.screen,
    backgroundColor: theme.colors.bg,
    justifyContent:"center",
    alignItems:"center"
  },
  header: {
    fontSize: 28,
    fontWeight: 800,
    color: theme.colors.text,
  },
  p: {
    marginTop: 6,
    marginBottom: 16,
    color: theme.colors.muted,
  },
});
