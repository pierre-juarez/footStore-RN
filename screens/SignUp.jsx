import { View, Text, ScrollView, SafeAreaView, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import styles from './login.style'
import { ButtonLogin } from '../components'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { COLORS, SIZES } from '../constants'
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'
import useFetch from '../hook/useFetch'

const SignUp = ({ navigation }) => {

  const { registerUser } = useFetch()

  const signUpSchema = Yup.object().shape({
    dni: Yup.string()
      .min(8, 'Mínimo 8 caracteres')
      .required('Campo requerido'),
    fullname: Yup.string()
      .required('Campo requerido'),
    email: Yup.string()
      .email('Correo inválido')
      .required('Campo requerido'),
    password: Yup.string()
      .min(8, 'Ingresa una contraseña válida')
      .max(15, 'Ingresa una contraseña válida')
      .required('Campo requerido')
  });

  const [loader, setLoader] = useState(false)
  const [obsecureText, setObsecureText] = useState(false)

  const signUp = async(values) => {
    console.log('values', values);
    setLoader(true)

    try {
      const register = await registerUser(values)

      if (register) {

        setLoader(false)
        Alert.alert('Registro exitoso! 😎', 'El usuario fue registrado correctamente, ya puede iniciar sesión', [
          {
            text: 'Iniciar sesión',
            onPress: () => navigation.replace('Login')
          },
          { defaulIndex: 1 }
        ]);
      } else {
        setLoader(false)
        console.log('Error al registrar usuario');
        Alert.alert('¡Oh, oh! 😪', 'Error al registrar usuario', [
          {
            text: 'Reintentar',
            onPress: () => { }
          },
          { defaulIndex: 1 }
        ]);
      }
    } catch (error) {
      setLoader(false)
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
            style={{
              height: SIZES.height / 4,
              width: SIZES.width - 60,
              resizeMode: 'contain',
              marginBottom: SIZES.xxLarge
            }}
          />

          <View style={styles.loginWrapper}>
            <Text style={styles.title}>Registro de Usuario</Text>
          </View>
          <Formik
            initialValues={{ dni:'', fullname: '', email: '', password: '' }}
            validationSchema={signUpSchema}
            onSubmit={(values) => signUp(values)}
          >
            {({ handleChange, handleBlur, touched, handleSubmit, values, errors, isValid, setFieldTouched }) => (
              <View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>DNI</Text>
                  <View style={styles.inputWrapper(touched.dni ? COLORS.primary : COLORS.offwhite)}>
                    <AntDesign
                      name='idcard'
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder={'Ingrese su DNI'}
                      onFocus={() => setFieldTouched('dni')}
                      onBlur={() => setFieldTouched('dni', '')}
                      value={values.dni}
                      onChangeText={handleChange('dni')}
                      autoCapitalize='none'
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.dni && errors.dni && (
                    <Text style={styles.errorMessage}>{errors.dni}</Text>
                  )}
                </View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>Nombres completos</Text>
                  <View style={styles.inputWrapper(touched.fullname ? COLORS.primary : COLORS.offwhite)}>
                    <AntDesign
                      name='user'
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder={'Ingrese su nombre completo'}
                      onFocus={() => setFieldTouched('fullname')}
                      onBlur={() => setFieldTouched('fullname', '')}
                      value={values.fullname}
                      onChangeText={handleChange('fullname')}
                      autoCapitalize='none'
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.fullname && errors.fullname && (
                    <Text style={styles.errorMessage}>{errors.fullname}</Text>
                  )}
                </View>

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

                <ButtonLogin title={'R E G I S T R A R'} onPress={isValid ? handleSubmit : () => { }} isValid={isValid} loader={loader} />
                <ButtonLogin title={'I N G R E S A R'} customColor={'#ff2c3b'} onPress={() => navigation.navigate('Login')} loader={false} />

              </View>
            )}

          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default SignUp