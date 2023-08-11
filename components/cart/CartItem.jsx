import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import { COLORS, SIZES } from '../../constants'
import useFetch from '../../hook/useFetch'

const CartItem = ({ item, onItemRemove }) => {
  const { removeItem } = useFetch();

  const deleteItem = async(id) => {
    const deleteProduct = await removeItem(id);
    if (deleteProduct){
      onItemRemove();
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: item.photo }}
        style={styles.thumb}
      />
      <View style={styles.containerItems}>
        <Text style={styles.detailName}>{item.name}</Text>
        <Text style={styles.detail}>Precio c/u: {item.price}</Text>
        <Text style={styles.detail}>Total: {item.price} x {item.quantity} = {item.price * item.quantity}</Text>
      </View>
      <View style={styles.containerIcon}>
        <TouchableOpacity style={styles.icon} onPress={()=>deleteItem(item.id)}>
          <Feather 
            name='trash-2'
            color={COLORS.red}
            size={30}
          />
        </TouchableOpacity>
      </View>
    </View>
    
  )
}

export default CartItem

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    marginVertical: 10,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 12
  },
  thumb: {
    aspectRatio: 1,
    resizeMode: 'cover',
    width: 120,
    height: 120,
    borderBottomStartRadius: 12,
    borderTopStartRadius: 12
  },
  containerItems: {
    width: '55%',
    marginTop: 15,
    marginHorizontal: 5
  },
  containerIcon: {
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center'    
  },
  icon: {
    width: '100%'
  },
  detailName: {
    fontFamily: 'bold',
    fontSize: SIZES.medium
  },
  detail: {
    fontFamily: 'regular',
    fontSize: SIZES.medium
  }
})