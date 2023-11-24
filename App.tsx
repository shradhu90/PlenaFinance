/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './App/Navigation/StackNavigation';
import { CartProvider } from './App/Services/CartContext';
function App(): JSX.Element {
  return (
    <CartProvider>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </CartProvider>
  );
}

export default App;
