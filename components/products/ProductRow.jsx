import { ActivityIndicator, FlatList, View } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS, SIZES } from '../../constants'
import ProductCart from './ProductCart'
import styles from './productRow.style'
import useFetch from '../../hook/useFetch'
import { useIsFocused } from '@react-navigation/native'

const ProductRow = () => {

  const { data, isLoading, error, refetch } = useFetch()
  const isFocused = useIsFocused()

  useEffect(() => {
    refetch();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
      ) : error ? (
        <Text>Oh, oh. ¡Ha ocurrido un error!</Text>
      ) : (
        
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (<ProductCart product= {item}/>)}
          horizontal
          contentContainerStyle={{ columnGap: SIZES.medium }}
        />
      )

      }
    </View>
  )
}

export default ProductRow