import {PropsWithChildren} from 'react';

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type CurrenyButtonProps = PropsWithChildren<{
  name: string;
  flag: string;
}>;

export default function CurrenyButton(props: CurrenyButtonProps): JSX.Element {
  const {name, flag} = props;
  return (
    <View style={styles.buttonContainer}>
      <Text style={styles.flag}>{flag}</Text>
      <Text style={styles.country}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    padding: 8,
    width: '100%',
  },
  flag: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 4,
  },
  country: {
    fontSize: 12,
    color: '#2d34d6',
    textAlign: 'center',
  },
});
