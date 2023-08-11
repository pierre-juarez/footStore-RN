import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import React from 'react'
import styles from './productList.style'
import useFetch from '../../hook/useFetch'
import { COLORS, SIZES } from '../../constants'
import ProductCart from './ProductCart'

const ProductList = () => {

  const { fullData, isLoading, error } = useFetch();

  if (isLoading){
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
      </View>
    )
  }
  return(
    <View style={styles.container}>
      <FlatList 
        data={fullData}
        numColumns={2}
        renderItem={({item}) => (<ProductCart product={item} />)}
        contentContainerStyle={styles.container}
        itemSeparatorComponent={() => (<View style={{ height: 30 }} />)}
      />
    </View>
  )
}

export default ProductList