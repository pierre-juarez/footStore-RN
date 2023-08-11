import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react'
import { generateUUID, generateToken } from '../helpers/Helpers'

const useFetch = () => {

  const [data, setData] = useState([])
  const [fullData, setFullData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = async() => {
    setIsLoading(true)

    try {
      const products = await getItemFromStorage('products');
      const activeHighlightProducts = products.filter(product => product.active === true && product.highlighted && product.stock > 0);
      const activeProducts = products.filter(product => product.active);
      setData(activeHighlightProducts)
      setFullData(activeProducts)
      setIsLoading(false)
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  }

  const saveUsers = async () => {
    const existUsers = await AsyncStorage.getItem('users');
    if (!existUsers) {
      try {
        const allUsers = require('../backend/users.json');
        await AsyncStorage.setItem('users', JSON.stringify(allUsers));
        console.log('Usuarios guardados en AsyncStorage');
      } catch (error) {
        console.error('Error al guardar usuarios en AsyncStorage', error);
      }
    }
  };

  const saveProducts = async () => {
    const existProducts = await AsyncStorage.getItem('products');
    if (!existProducts) {
      try {
        const allProducts = require('../backend/products.json');
        await AsyncStorage.setItem('products', JSON.stringify(allProducts));
        console.log('Productos guardados en AsyncStorage');
      } catch (error) {
        console.error('Error al guardar productos en AsyncStorage', error);
      }
    }
  };

  const getUsersFromStorage = async () => {
    try {
      const usersString = await AsyncStorage.getItem('users');
      if (usersString) {
        const users = JSON.parse(usersString);
        console.log('Usuarios obtenidos de AsyncStorage:', users);
        return users;
      } else {
        console.log('No se encontraron usuarios en AsyncStorage');
        return [];
      }
    } catch (error) {
      console.error('Error al obtener usuarios de AsyncStorage', error);
      return [];
    }
  };

  const authenticate = async (email, password) => {
    try {
      const users = await getUsersFromStorage();
      console.log('usuarios pesh', users);
      const user = users.find(u => u.email === email && u.password === password && u.active === true);

      if (user) {
        user.token = generateToken()
        return user;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error al autenticar BD', error);
      return null;
    }
  };

  const registerUser = async (newUser) => {
    try {
      const userData = {
        ...newUser,
        "active": true,
        "id": generateUUID(),
        "role": "usuario"
      }
      const users = await getUsersFromStorage();
      const updatedUsers = [...users, userData];
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
      console.log('Nuevo usuario agregado y lista actualizada en AsyncStorage');
      return true;
    } catch (error) {
      console.error('Error al agregar usuario y actualizar lista en AsyncStorage', error);
      return false;
    }
  };

  const addToCart = async (product) => {
    try {

      if (product.stock < product.quantity) {
        throw new Error('No hay suficiente stock disponible');
      }
  
      const cart = await getItemFromStorage('cart');
      const updatedCart = [...cart, product];
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  
      const products = await getItemFromStorage('products');
      const updatedProducts = products.map((p) => {
        if (p.id === product.id) {
          return { ...p, stock: p.stock - product.quantity };
        }
        return p;
      });
      await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));
  
      console.log('Producto agregado al carrito y carrito actualizado en AsyncStorage');
      return true;
    } catch (error) {
      console.error('Error al agregar producto al carrito y actualizar carrito en AsyncStorage', error);
      throw error; // Lanzar el error para que pueda ser capturado y manejado
    }
  };
  
  
  
  

  const countCart = async () => {
    try {
      const cartItems = await AsyncStorage.getItem('cart');
      if (cartItems) {
        const parsedCart = JSON.parse(cartItems);
        return parsedCart.length;
      }
      return 0;
    } catch (error) {
      console.error('Error al obtener el número de items en el carrito', error);
      return 0;
    }
  };

  const removeItemsCart = async() => {
    await AsyncStorage.removeItem('cart');
  }

  const removeItem = async (productId) => {
    try {
      const cart = await getCartFromStorage();
      const updatedCart = cart.filter(item => item.id !== productId);
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      console.log('Producto eliminado del carrito y carrito actualizado en AsyncStorage');
      return true;
    } catch (error) {
      console.error('Error al eliminar producto del carrito y actualizar carrito en AsyncStorage', error);
      return false;
    }
  };

  const getItemFromStorage = async (item) => {
    try {
      const data = await AsyncStorage.getItem(item);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error(`Error al obtener ${data} de AsyncStorage`, error);
      return [];
    }
  };
  

  


  return {
    data,
    fullData,
    isLoading,
    error,
    refetch,
    authenticate,
    saveUsers,
    registerUser,
    addToCart,
    countCart,
    removeItemsCart,
    removeItem,
    saveProducts,
    getItemFromStorage
  }

}

export default useFetch