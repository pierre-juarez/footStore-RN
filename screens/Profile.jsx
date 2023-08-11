import { Alert, Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import styles from './profile.style'
import { StatusBar } from 'expo-status-bar'
import { COLORS } from '../constants'
import { MaterialCommunityIcons, SimpleLineIcons, AntDesign } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { capitalizeString } from '../helpers/Helpers'

const Profile = ({ navigation }) => {

  const [userData, setUserData] = useState(null)
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    checkExistUser()
  }, [])
  

  const checkExistUser = async () => {
    const userID = await AsyncStorage.getItem('id')

    if(userID){
      try {
        const currentUser = await AsyncStorage.getItem(userID)
        if (currentUser != null) {
          const parsedData = JSON.parse(currentUser)
          setUserData(parsedData)
          setIsLogin(true)
        } else {
          navigation.navigate('Login')
        }
      } catch (error) {
        console.error('Error al obtener la data del usuario', error)
      }
    }

  }

  const logout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Desea cerrar sesión realmente?',
      [
        {
          text: 'Cancelar', onPress: () => console.log('Cancel')
        },
        {
          text: '¡Sí!', onPress: () => userLogout()
        },
        { defaultIndex: 1 }
      ]
    )
  }

  const userLogout = async() => {
    const id = await AsyncStorage.getItem('id')
    const userID = `user_${id}`

    try {
      AsyncStorage.multiRemove([userID, 'id'])
      navigation.navigate('Login')
    } catch (error) {
      console.error('Error al cerrar sesión', error)
    }

  }

  const deleteAccount = () => {
    Alert.alert(
      'Eliminar cuenta',
      'Al eliminar su cuenta se borraran todos sus datos de nuestra tienda, ¿desea continuar?',
      [
        {
          text: 'Cancelar', onPress: () => console.log('Cancel')
        },
        {
          text: 'Eliminar', onPress: () => console.log('Logout')
        },
        { defaultIndex: 1 }
      ]
    )
  }

  const clearCache = () => {
    Alert.alert(
      'Eliminar caché',
      'Se borraran todos los items en su carrito, ¿desea continuar?',
      [
        {
          text: 'Cancelar', onPress: () => console.log('Cancel')
        },
        {
          text: 'Eliminar', onPress: () => console.log('Logout')
        },
        { defaultIndex: 1 }
      ]
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <StatusBar backgroundColor={COLORS.gray} />
        <View style={{ width: '100%' }}>
          <Image
            source={require('../assets/images/background.jpg')}
            style={styles.cover}
          />
        </View>
        <View style={styles.profileContainer}>
          <Image
            source={userData?.gender == 'male' ? require('../assets/images/man.png') : require('../assets/images/woman.png')}
            style={styles.profile}
          />
          <Text style={styles.name}>
            {isLogin === true ? `${userData.fullname} - ${capitalizeString(userData.role)}` : 'Por favor, inicia sesión'}
          </Text>

          {isLogin === false ? (
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <View style={styles.loginBtn}>
                <Text style={styles.menuText}>L O G I N   </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.loginBtn}>
              <Text style={styles.menuText}>{userData.email}    </Text>
            </View>
          )
          }

          {isLogin === false ? (
            <View></View>
          ) : (
            <View style={styles.menuWrapper}>
              <TouchableOpacity onPress={() => { }}>
                <View style={styles.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name='heart-outline'
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={styles.menuText}>Favoritos</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { }}>
                <View style={styles.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name='truck-delivery-outline'
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={styles.menuText}>Pedidos</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { }}>
                <View style={styles.menuItem(0.2)}>
                  <SimpleLineIcons
                    name='bag'
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={styles.menuText}>Carrito</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => clearCache()}>
                <View style={styles.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name='cached'
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={styles.menuText}>Limpiar caché</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteAccount()}>
                <View style={styles.menuItem(0.2)}>
                  <AntDesign
                    name='deleteuser'
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={styles.menuText}>Eliminar cuenta</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => logout()}>
                <View style={styles.menuItem(0.2)}>
                  <AntDesign
                    name='logout'
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={styles.menuText}>Cerrar sesión</Text>
                </View>
              </TouchableOpacity>
            </View>
          )
          }

        </View>
      </View>
    </View>
  )
}

export default Profile