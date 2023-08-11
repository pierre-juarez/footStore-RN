import { FlatList, Image, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import styles from './search.styles';
import { Feather, Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import useFetch from '../hook/useFetch';
import ProductCart from '../components/products/ProductCart';

const Search = () => {

  const [textSearch, setTextSearch] = useState('')
  const [results, setResults] = useState([])
  const { fullData, isLoading, error } = useFetch()

  const handlerSearch = () => {
    if (error) {
      console.log('Failed', error);
      setResults([])
    }

    if (textSearch.trim().length === 0){
      setResults([])
    }else{
      const dataFilter = fullData.filter((product) =>
        Object.values(product).some((prop, index) =>
          Object.keys(product)[index] !== 'id' && prop.toString().toLowerCase().includes(textSearch.toLowerCase())
        )
      );
      setResults(dataFilter)
    }

  }

  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Ionicons name='camera-outline' size={24} style={styles.searchIcon} />
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <TextInput
            value={textSearch}
            onChangeText={setTextSearch}
            placeholder='¿Qué estás buscando?'
            style={styles.searchInput} />
        </View>
        <View>
          <TouchableOpacity style={styles.searchBtn} onPress={() => handlerSearch()}>
            <Feather name='search' size={SIZES.xLarge} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>

      {results.length === 0 ? (
        <View style={{ flex: 1 }}>
          <Image
            source={require('../assets/images/Pose23.png')}
            style={styles.searchImg}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <FlatList
            data={results}
            numColumns={2}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (<ProductCart product={item} />)}
            contentContainerStyle={styles.container}

          />
        </View>
      )}

    </SafeAreaView>
  )
}

export default Search