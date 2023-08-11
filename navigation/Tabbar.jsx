import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home, Profile, Search } from '../screens';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/index';

const tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  tabBarHideOnKeyboard: true,
  headerShown: false,
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60
  }

}

const Tabbar = () => {
  return (
    <tab.Navigator screenOptions={screenOptions}>
      <tab.Screen
        name='Home'
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color={focused ? COLORS.primary : COLORS.gray2}
            />
          }
        }} />
      <tab.Screen
        name='Search'
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => {
            return <Ionicons
              name={'search-sharp'}
              size={24}
              color={focused ? COLORS.primary : COLORS.gray2}
            />
          }
        }} />
      <tab.Screen
        name='Profile'
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={24}
              color={focused ? COLORS.primary : COLORS.gray2}
            />
          }
        }} />
    </tab.Navigator>
  )
}

export default Tabbar