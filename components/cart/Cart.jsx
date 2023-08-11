import { View, Text, FlatList, SafeAreaView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import useFetch from '../../hook/useFetch';
import styles from './cart.style';
import BackButton from '../BackButton';
import CartItem from './CartItem';
import ButtonLogin from '../ButtonLogin';
import { COLORS } from '../../constants';

const Cart = ({ navigation }) => {
  const { getItemFromStorage } = useFetch()
  const [products, setProducts] = useState([])
  const [totalPay, setTotalPay] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const items = await getItemFromStorage('cart');
      console.log('items', items);
      const totalSum = items.reduce((accumulator, currentItem) => {
        return accumulator + (currentItem.price * currentItem.quantity);
      }, 0);
      setProducts(items);
      setTotalPay(totalSum);
    };

    fetchData();
  }, []);

  const sendPay = () => {
    Alert.alert('¿Con qué método desea pagar?','A continuación seleccione el método de pago de su preferencia',[
      {
        text: 'CULQUI/YAPE',
        onPress: ()=>inProgress()
      },
      {
        text: 'Stripe',
        onPress: ()=>navigation.navigate('SendPay', { totalPay })
      }
    ])
  }

  const inProgress = () => {
    Alert.alert('¡Ups! 👀','Estamos implementando esté método de pago. Gracias por su comprensión',[
      {
        text: 'Lo entiendo',
        onPress: ()=>{}
      },
    ])
  }

  const handleItemRemove = async () => {
    const updatedItems = await getCartFromStorage();
    const totalSum = updatedItems.reduce((accumulator, currentItem) => {
      return accumulator + (currentItem.price * currentItem.quantity);
    }, 0);
    setProducts(updatedItems);
    setTotalPay(totalSum);
  };


  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.wrapper}>
          <BackButton onPress={() => navigation.goBack()} />
          <Text style={styles.title}>Carrito de Compras</Text>
          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (<CartItem item={item} onItemRemove={handleItemRemove} />)}
          />
        </View>
        <View style={styles.resumeWrapper}>
          <Text style={styles.titleResume}>Resumen de la compra</Text>
          <View style={styles.detailResumeWrapper}>
            <Text style={styles.detailResume}>Total</Text>
            <Text style={styles.detailResume}>S/.{totalPay}.00</Text>
          </View>
          <ButtonLogin onPress={() => sendPay()} title={'P A G A R'} loader={false} customColor={COLORS.primary} />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Cart