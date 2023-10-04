import React from 'react';
import {StyleSheet} from 'react-native';
import RollTheDice from './views/RollTheDice';
import CurrencyConverter from './views/CurrencyConverter';
import TicTacToe from './views/TicTacToe';

export default function App(): JSX.Element {
  return (
    <>
      {/* <RollTheDice /> */}
      {/* <CurrencyConverter /> */}
      <TicTacToe />
    </>
  );
}

const styles = StyleSheet.create({});
