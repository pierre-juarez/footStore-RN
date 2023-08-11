import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './newScreens.style'
import { COLORS } from '../constants'
import { Ionicons } from '@expo/vector-icons'
import { ProductList } from '../components'
import { useNavigation } from '@react-navigation/native'

const NewScreens = () => {
  const nav = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.upperRow}>
          <TouchableOpacity onPress={() => nav.goBack()}>
            <Ionicons
              name='chevron-back-circle'
              size={30}
              color={COLORS.lightWhite}
            />
          </TouchableOpacity>
          <Text style={styles.heading}>Productos</Text>
        </View>
        <ProductList />
      </View>
    </SafeAreaView>
  )
}

export default NewScreens