import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import Tabbar from './navigation/Tabbar';
import { ProductDetail, NewScreens, Login, SignUp, CartProduct, SendPay } from './screens';
import { StripeProvider } from '@stripe/stripe-react-native';

export default function App() {

  const stack = createNativeStackNavigator();

  const [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    light: require("./assets/fonts/Poppins-Light.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    extrabold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
    semibold: require("./assets/fonts/Poppins-SemiBold.ttf")
  });


  if(!fontsLoaded){
    return null;
  }

  return (
   <StripeProvider publishableKey='pk_test_51MJ8ugBVm1gdl9i0aghjOHsCLV1ZfCLyoU6a9DanC2M5b3sBQSNzbpez88icuTZsuQ5MAMhqas155G5eIdKbqLsq00E3Of0mvG'>
     <NavigationContainer>
      <stack.Navigator>
      <stack.Screen 
          name='Login'
          component={Login}
          options={{headerShown: false}}
        />
        <stack.Screen 
            name='Tabbar'
            component={Tabbar}
            options={{headerShown: false}}
          />
        <stack.Screen 
          name='ProductDetail'
          component={ProductDetail}
          options={{headerShown: false}}
        />
        <stack.Screen 
          name='NewScreens'
          component={NewScreens}
          options={{headerShown: false}}
        />
        <stack.Screen 
          name='SignUp'
          component={SignUp}
          options={{headerShown: false}}
        />
        <stack.Screen 
          name='CartProduct'
          component={CartProduct}
          options={{headerShown: false}}
        />
        <stack.Screen 
          name='SendPay'
          component={SendPay}
          options={{headerShown: false}}
        />
      </stack.Navigator>
    </NavigationContainer>
   </StripeProvider>
  );
}

