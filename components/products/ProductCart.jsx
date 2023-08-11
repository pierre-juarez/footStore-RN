import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import styles from './productCart.style'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants'
import { useNavigation } from '@react-navigation/native'

const ProductCart = ({ product }) => {

  const nav = useNavigation();
  return (
    <TouchableOpacity onPress={() => nav.navigate('ProductDetail', {product})}>
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          source={{ uri: product.thumb }}
          style={styles.image}
        />
      </View>

      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={1}>{ product.name }</Text>
        <Text style={styles.supplier} numberOfLines={1}>{ product.type }</Text>
        <Text style={styles.price}>S/. {product.price}</Text>
      </View>

      <TouchableOpacity>
        <Ionicons name='add-circle' size={35} color={COLORS.primary} style={styles.addBtn} />
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
  )
}

export default ProductCart
