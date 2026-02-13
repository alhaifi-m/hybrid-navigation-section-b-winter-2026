import { StyleSheet, Text, View } from "react-native";
import { theme } from "@/styles/theme";
import React from "react";

type AppCardProps = {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
};

const AppCard = ({ title, subtitle, right }: AppCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.textWrap}>
        <Text style={styles.title}>{title}</Text>
        { subtitle? <Text style={styles.subtitle}>{subtitle}</Text> : null}

      </View>
    </View>
  );
};

export default AppCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.card,
    padding: theme.spacing.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing.gap,
  },
  textWrap:{
    flex:1,
    paddingRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.text
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: theme.colors.muted
  }
});
