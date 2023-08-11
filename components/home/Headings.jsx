import { Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants'
import styles from './headings.styles'
import { useNavigation } from '@react-navigation/native'

const Headings = () => {
  const nav = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Productos destacados</Text>
        <TouchableOpacity onPress={()=>nav.navigate('NewScreens')}>
          <Ionicons name='ios-grid' size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Headings