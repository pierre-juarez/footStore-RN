import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { COLORS, SIZES } from '../constants'

const BackButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={(onPress)}
      style={{ alignItems: 'center', position: 'absolute', zIndex: 999, top: SIZES.large - 10 }}
    >
      <Ionicons
        name='chevron-back-circle'
        size={30}
        color={COLORS.primary}
      />
    </TouchableOpacity>
  )
}

export default BackButton