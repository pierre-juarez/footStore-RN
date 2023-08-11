import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from './home.styles';
import { Fontisto, AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Welcome } from '../components';
import Carousel from '../components/home/Carousel';
import Headings from '../components/home/Headings';
import ProductRow from '../components/products/ProductRow';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { capitalizeString } from '../helpers/Helpers'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import useFetch from '../hook/useFetch';

const Home = () => {
  const nav = useNavigation()
  const isFocused = useIsFocused()
  const { countCart } = useFetch()
  const [userData, setUserData] = useState(null)
  const [isLogin, setIsLogin] = useState(false)
  const [itemsCart, setItemsCart] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      await checkExistUser();
      const itemsCount = await countCart();
      setItemsCart(itemsCount);
    }
    fetchData();
  }, [isFocused])


  const checkExistUser = async () => {
    const userID = await AsyncStorage.getItem('id')
    if(userID){
      try {
        const currentUser = await AsyncStorage.getItem(userID)
        if (currentUser != null) {
          const parsedData = JSON.parse(currentUser)
          setUserData(parsedData)
          setIsLogin(true)
        }
      } catch (error) {
        console.error('Error al obtener la data del usuario', error)
      }
    }
  }

  return (
    <SafeAreaView>
      <View style={styles.appBarWrapper}>
        <View style={styles.appBar}>
          <AntDesign name='user' size={24} />
          <Text style={styles.location}>{userData ? `¡Hola, ${capitalizeString(userData.role)}!` : 'Lambayeque, Perú'}</Text>

          <View style={styles.flexEnd}>
            <View style={styles.cartCount}>
              <Text style={styles.cartNumber}>{itemsCart}</Text>
            </View>
            <TouchableOpacity onPress={() => nav.navigate('CartProduct')}>
              <Fontisto name='shopping-bag' size={24} />
            </TouchableOpacity>
          </View>

        </View>
      </View>
      <ScrollView>
        <Welcome />
        <Carousel />
        <Headings />
        <ProductRow />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home