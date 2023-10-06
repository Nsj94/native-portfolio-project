import {StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Home from '../views/Home';
import MusicPlayer from '../views/MusicPlayer';
import TicTacToe from '../views/TicTacToe';
import TrendingProducts from '../views/TrendingProducts';
import SingleProductDetails from '../views/SingleProductDetails';
import CurrencyConverter from '../views/CurrencyConverter';
import RollTheDice from '../views/RollTheDice';

export type RootStackParamsList = {
  Home: undefined;
  MusicPlayer: undefined;
  TicTacToe: undefined;
  CurrencyConverter: undefined;
  RollTheDice: undefined;
  TrendingProducts: undefined;
  SingleProductDetails: {productId: number};
};
const Stack = createNativeStackNavigator<RootStackParamsList>();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="MusicPlayer" component={MusicPlayer} />
      <Stack.Screen name="TicTacToe" component={TicTacToe} />
      <Stack.Screen name="CurrencyConverter" component={CurrencyConverter} />
      <Stack.Screen name="RollTheDice" component={RollTheDice} />
      <Stack.Screen
        name="TrendingProducts"
        component={TrendingProducts}
        options={{
          title: 'Trending Product',
        }}
      />
      <Stack.Screen
        name="SingleProductDetails"
        component={SingleProductDetails}
        options={{
          title: 'Single Product Details',
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({});
