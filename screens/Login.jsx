import { View, Text, ScrollView, SafeAreaView, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import styles from './login.style'
import { ButtonLogin } from '../components'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { COLORS } from '../constants'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useFetch from '../hook/useFetch'

const Login = ({ navigation }) => {

  const { saveUsers, saveProducts, authenticate } = useFetch();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    saveUsers();
    saveProducts();
    const fetchData = async() => {
      await checkExistUser();
    };
    fetchData();
  }, []);

  const checkExistUser = async () => {
    const userID = await AsyncStorage.getItem('id')
    if(userID){
      try {
        const currentUser = await AsyncStorage.getItem(userID)
        if (currentUser != null) {
          setIsLogin(true);
          navigation.navigate('Tabbar');
        }
      } catch (error) {
        setIsLogin(false);
        navigation.navigate('Tabbar');
        console.error('Error al obtener la data del usuario', error)
      }
    }
  }
  

  const loginSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, 'Ingresa una contraseña válida')
      .max(15, 'Ingresa una contraseña válida')
      .required('Campo requerido'),
    email: Yup.string().email('Correo inválido').required('Campo requerido'),
  });

  const [loader, setLoader] = useState(false)
  const [obsecureText, setObsecureText] = useState(false)

  const login = async (values) => {
    console.log('values', values);
    setLoader(true)

    try {
      const user = await authenticate(values.email, values.password);

      if (user) {
        await AsyncStorage.setItem(`user_${user.id}`,JSON.stringify(user));
        await AsyncStorage.setItem('id',`user_${user.id}`);

        Alert.alert('¡Bienvenido! 🥳', 'Sesión iniciada correctamente', [
          {
            text: '¡Adelante!',
            onPress: () => navigation.replace('Tabbar')
          },
          { defaulIndex: 1 }
        ]);
      } else {
        console.log('Credenciales inválidas');
        Alert.alert('¡Oh, oh! 😪', 'Credenciales inválidas', [
          {
            text: 'Revisar',
            onPress: () => { }
          },
          { defaulIndex: 1 }
        ]);
      }
    } catch (error) {
      console.error('Error al autenticar', error);
      Alert.alert('Error', 'Ha ocurrido un error', [
        {
          text: 'Ok',
          onPress: () => { }
        },
        { defaulIndex: 1 }
      ]);
    } finally {
      setLoader(false);
    }

  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.safeArea}>
        <View>
          
          <Image
            source={require('../assets/images/bk.png')}
            style={styles.cover}
          />

          <View style={styles.loginWrapper}>
            <Text style={styles.title}>Inicio de Sesión</Text>
          </View>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginSchema}
            onSubmit={(values) => login(values)}
          >
            {({ handleChange, handleBlur, touched, handleSubmit, values, errors, isValid, setFieldTouched }) => (
              <View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>Correo</Text>
                  <View style={styles.inputWrapper(touched.email ? COLORS.primary : COLORS.offwhite)}>
                    <MaterialCommunityIcons
                      name='email-outline'
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder={'Ingrese su correo electrónico'}
                      onFocus={() => setFieldTouched('email')}
                      onBlur={() => setFieldTouched('email', '')}
                      value={values.email}
                      onChangeText={handleChange('email')}
                      autoCapitalize='none'
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.email && errors.email && (
                    <Text style={styles.errorMessage}>{errors.email}</Text>
                  )}
                </View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>Contraseña</Text>
                  <View style={styles.inputWrapper(touched.password ? COLORS.primary : COLORS.offwhite)}>
                    <MaterialCommunityIcons
                      name='lock-outline'
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      secureTextEntry={!obsecureText}
                      placeholder={'Contraseña'}
                      onFocus={() => setFieldTouched('password')}
                      onBlur={() => setFieldTouched('password', '')}
                      value={values.password}
                      onChangeText={handleChange('password')}
                      autoCapitalize='none'
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                    <TouchableOpacity onPress={() => setObsecureText(!obsecureText)}>
                      <MaterialCommunityIcons
                        name={obsecureText ? 'eye-outline' : 'eye-off-outline'}
                        size={18}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errorMessage}>{errors.password}</Text>
                  )}
                </View>

                <ButtonLogin
                  title={'I N G R E S A R'}
                  onPress={isValid ? handleSubmit : () => { }}
                  isValid={isValid}
                  loader={loader}
                />

                <ButtonLogin
                  title={'R E G I S T R O'}
                  customColor={'#ff2c3b'}
                  onPress={() => navigation.navigate('SignUp')}
                  loader={false}
                />

              </View>
            )}

          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default Login