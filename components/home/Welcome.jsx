import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import styles from './welcome.styles';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from '../../constants';
import { Feather, Ionicons } from '@expo/vector-icons';

const Welcome = () => {
  const nav = useNavigation();
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.welcomeText(COLORS.black, SIZES.xSmall)}>Busca lo mejor</Text>
        <Text style={styles.welcomeText(COLORS.primary, 0)}>¡Somos lo mejor!</Text>
      </View>

      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Feather name='search' size={24} style={styles.searchIcon} />
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value=''
            onPressIn={() => nav.navigate('Search')}
            placeholder='¿Qué estás buscando?'
          />
        </View>
        <View>
          <TouchableOpacity style={styles.searchBtn}>
            <Ionicons name='camera-outline' size={SIZES.xLarge} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>

    </View>
  )
}

export default Welcome