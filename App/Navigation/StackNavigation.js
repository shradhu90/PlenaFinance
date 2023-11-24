import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home';
import Onbording from '../Screens/Onbording';
import Cart from '../Screens/Cart';
import ProductDetailScreen from '../Screens/ProductDetail';

const Stack = createStackNavigator();
const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName='Onbording' screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Onbording" component={Onbording} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="Cart" component={Cart} />
    </Stack.Navigator>
  )
}

export default StackNavigation