import React from 'react';
import {StyleSheet} from 'react-native';
import RollTheDice from './views/RollTheDice';
import CurrencyConverter from './views/CurrencyConverter';

export default function App(): JSX.Element {
  return (
    <>
      {/* <RollTheDice /> */}
      <CurrencyConverter />
    </>
  );
}

const styles = StyleSheet.create({});
