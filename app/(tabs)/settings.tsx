import { StyleSheet, Text, View, Switch } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import AppCard from '@/components/app-card'
import { theme } from '@/styles/theme'
import React, {useState} from 'react'

const Settings = () => {
    const [notifications, setNontification] = useState(true)
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Setting</Text>
      <AppCard 
      title='Notifications'
      subtitle='Enable app notifications'
      right={
        <Switch value={notifications} onValueChange={setNontification} />
      }
      />

      <AppCard
      title='Account'
      subtitle='Update Profile settings'
      right={
        <Ionicons 
        name='person-circle-outline'
        size={24}
        color={theme.colors.primary}
        />
      }
      />
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.spacing.screen,
        backgroundColor: theme.colors.bg,
    },
    h1: {
        fontSize: 22,
        fontWeight: "800",
        marginBottom:12,
        color: theme.colors.text
    }
})