import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'

const ButtonLogin = ({ title, onPress, isValid, customColor, loader }) => {
  const backgroundColor = customColor ? customColor : (isValid ? COLORS.primary : COLORS.gray);
  return (
    <TouchableOpacity onPress={onPress} style={styles.btnStyle(backgroundColor)} >
      { loader === false ? (
        <Text style={styles.btnTitle}>{title}</Text>
      ) : (
        <ActivityIndicator />
      )

      }
    </TouchableOpacity>
  )
}

export default ButtonLogin

const styles = StyleSheet.create({
  btnTitle: {
    fontFamily: 'bold',
    color: COLORS.white,
    fontSize: 18
  },
  btnStyle : (backgroundColor) => ({
    height: 50,
    width: '100%',
    marginTop: 10,
    backgroundColor: backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12
  }) 
})