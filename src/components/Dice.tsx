import React, {PropsWithChildren} from 'react';
import {Image, ImageSourcePropType, StyleSheet, View} from 'react-native';

type DiceProps = PropsWithChildren<{
  imageUrl: ImageSourcePropType;
}>;

function Dice({imageUrl}: DiceProps): JSX.Element {
  return (
    <View>
      <Image source={imageUrl} style={styles.diceImage} />
    </View>
  );
}

export default Dice;

const styles = StyleSheet.create({
  diceImage: {
    height: 100,
    width: 100,
  },
});
