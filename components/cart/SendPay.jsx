import { View, Text, SafeAreaView, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native'
import { COLORS, SIZES } from '../../constants'
import ButtonLogin from '../ButtonLogin'
import { useRoute, useNavigation } from '@react-navigation/native'
import useFetch from '../../hook/useFetch'
import LottieView from 'lottie-react-native'
import BackButton from '../BackButton'

const SendPay = ({ navigation }) => {
  const nav = useNavigation()
  const route = useRoute()
  const { totalPay } = route.params
  const { removeItemsCart } = useFetch()
  const API_URL = 'http://localhost:3000'
  const [cardDetails, setCardDetails] = useState()
  const { confirmPayment, loading } = useConfirmPayment()
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [loader, setLoader] = useState(false);


  const sendPay = async () => {
    if (!cardDetails?.complete) {
      Alert.alert('Error ❌', 'Ingresa todos los detalles de la tarjeta')
      return;
    }

    const paymentData = {
      email: 'email@example.com'
    }

    // FIXME: ERROR SENDPAYMENT - CRASH APP
    // try {
    //   const { clientSecret, error } = await sendPayStripe();
    //   if(error){
    //     console.error('Error en el pago');
    //   }else{
    //     const { paymentIntent, error } = await confirmPayment(clientSecret, {
    //       type: 'Card',
    //       billingDetails: paymentData
    //     });
    //     if (error){
    //       Alert.alert('Payment error', error);
    //     }else if(paymentIntent){
    //       Alert.alert('¡Compra cancelada exitosamente! 🥳✅', 'Gracias por comprar en FootStore', [
    //         {
    //           text: '¡Nos veremos pronto!',
    //           onPress: async() => {
    //             await removeItemsCart()
    //             nav.navigate('Tabbar')
    //           }
    //         }
    //       ]);
    //       console.log('Payment successfully', paymentIntent);
    //     }
    //   }
    // } catch (error) {

    // }

    // Simuliación de compra
    setLoader(true)
    setTimeout(() => {
      setLoader(false)
      setIsPaymentSuccess(true)
      setTimeout(() => {
        setIsPaymentSuccess(false)
        setTimeout(async () => {
          await removeItemsCart()
          nav.navigate('Tabbar')
        }, 2000);
      }, 1700);
    }, 3000)
    // setIsPaymentSuccess(true)



  }

  const sendPayStripe = async () => {
    const response = await fetch(`${API_URL}/send-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        mount: totalPay
      })
    });

    const { clientSecret, error } = await response.json()
    return { clientSecret, error };
  }

  return (
    <SafeAreaView style={styles.container}>
      {loader && (
        <View style={styles.loadingAnimationContainer}>
          <LottieView
            style={{ width: '100%', aspectRatio: 1 }}
            source={require('../../assets/animations/sendPayment.json')} // Reemplaza con la ruta a tu animación de carga
            autoPlay
            loop
          />
        </View>
      )}
      {isPaymentSuccess && (
        <View style={styles.loadingAnimationContainer}>
          <LottieView
            style={{ width: '100%', aspectRatio: 1 }}
            source={require('../../assets/animations/payment_success.json')} // Reemplaza con la ruta a tu animación de carga
            autoPlay
            loop
          />
        </View>
      )}
      <View style={styles.wrapper}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={{ fontFamily: 'bold', fontSize: 20, marginTop: 200 }}>Proceso de pago</Text>
        <CardField
          postalCodeEnabled={false}
          placeholder={{
            number: '4242 4242 4242 4242'
          }}
          cardStyle={styles.card}
          style={styles.cardContainer}
          onCardChange={cardDetails => { setCardDetails(cardDetails) }}
        />
        <ButtonLogin onPress={() => sendPay()} loader={loading} title={`P A G A R  S/.${totalPay}`} customColor={COLORS.tertiary} />
      </View>
    </SafeAreaView>
  )
}

export default SendPay

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightWhite,
    width: '100%',
    height: '100%'
  },
  wrapper: {
    marginHorizontal: 20
  },
  card: {
    backgroundColor: '#7D82B8',
    color: COLORS.white
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
    color: COLORS.white
  },
  loadingAnimationContainer: {
    backgroundColor: 'rgba(249, 220, 248, 0.5)', // Color con opacidad
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center', // Centra horizontalmente
    justifyContent: 'center', // Centra verticalmente
    height: '100%', // Ajusta esta altura según lo necesario
    position: 'absolute',
    zIndex: 999
  }
})