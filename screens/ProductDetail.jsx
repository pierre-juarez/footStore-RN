import { View, TouchableOpacity, Image, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import styles from './productDetail.style'
import { Ionicons, SimpleLineIcons, MaterialCommunityIcons, Fontisto } from '@expo/vector-icons'
import { COLORS } from '../constants'
import { useNavigation, useRoute } from '@react-navigation/native'
import useFetch from '../hook/useFetch'

const ProductDetail = (navigation) => {
  const route = useRoute()
  const { product } = route.params
  const [count, setCount] = useState(1)
  const [total, setTotal] = useState(product.price * 1)
  const [cartItems, setCartItems] = useState([])
  const nav = useNavigation()
  const { addToCart } = useFetch()

  const increment = () => {
    if (product.stock <= count){
      Alert.alert('Lo sentimos🥲','Ya no hay stock para este producto',[
        {
          text: 'Entiendo',
          onPress: ()=>{}
        }
      ])
    }else{
      setCount(count + 1)
      setTotal(product.price * (count+1))
    }
  }

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1)
      setTotal(product.price * (count-1))
    }
  }



  const addCart = async() => {

    const newItem = {
      id: product.id,
      name: product.name,
      photo: product.thumb,
      quantity: count,
      price: product.price,
      total: total
    };

    const add = await addToCart(newItem);

    if(add){
      Alert.alert('¡Producto agregado! ✅', 'El producto se ha añadido al carrito', [
        {
          text: 'Continuar comprando',
          onPress: () => nav.goBack()
        },
        {
          text: 'Ver carrito',
          onPress: () => nav.navigate('CartProduct')
        }
      ]);
    }else{
      Alert.alert('Oh, oh! ❌', 'No se pudo agregar el producto', [
        {
          text: 'Reintentar',
          onPress: () => {}
        }
      ]);
    }
    setCount(1)
    setTotal(product.price * 1)

  }

  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => nav.goBack()}>
          <Ionicons
            name='chevron-back-circle'
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { }}>
          <Ionicons
            name='heart'
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>
      <Image
        source={{ uri: product.thumb }}
        style={styles.imgProduct}
      />

      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{product.name}</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>S/. {product.price}</Text>
          </View>
        </View>


        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            {[1, 2, 3, 4, 5].map((index) => (
              <Ionicons
                key={index}
                name='star'
                size={24}
                color='gold'
              />
            ))}
            <Text style={styles.ratingText}> (4.9)</Text>
          </View>

          <View style={styles.rating}>
            <TouchableOpacity onPress={() => increment()}>
              <SimpleLineIcons
                name='plus'
                size={20}
              />
            </TouchableOpacity>
            <Text style={styles.ratingText}>  {count}  </Text>
            <TouchableOpacity onPress={() => decrement()}>
              <SimpleLineIcons
                name='minus'
                size={20}
              />
            </TouchableOpacity>
          </View>

        </View>


        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>Descripción</Text>
          <Text style={styles.descriptionText}>{product.description}</Text>
        </View>

        <View style={styles.locationWrapper}>
          <View style={styles.location}>

            <View style={styles.locationItems}>
              <Ionicons name='location-outline' size={20} />
              <Text>  {product.ubication}</Text>
            </View>

            <View style={styles.locationItems}>
              <MaterialCommunityIcons name='truck-delivery-outline' size={20} />
              <Text>  Delivery gratis </Text>
            </View>

          </View>
        </View>

        <View style={styles.detailsWrapper}>
          <View style={{ flexDirection: 'row' }}>
          <Text style={styles.description}>Stock: </Text>
          <Text style={styles.descriptionStock}> {product.stock}</Text>
          </View>

          <View  style={{ flexDirection: 'row' }}>
          <Text style={styles.description}>Total: </Text>
          <Text style={styles.descriptionStock}> S/.{total}</Text>
          </View>
        </View>

        <View style={styles.cartRow}>
          <TouchableOpacity onPress={() => addCart()} style={styles.cartBtn}>
            <Text style={styles.cartTitle}>¡AGREGAR AL CARRITO!</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => nav.navigate('CartProduct')} style={styles.addCartBtn}>
            <Fontisto  name='shopping-bag' size={22} color={COLORS.lightWhite} />
          </TouchableOpacity>
        </View>

      </View>
    </View>
  )
}

export default ProductDetail