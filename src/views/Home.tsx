import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useContext} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {RootStackParamsList} from '../Routes/AppStack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../context/AuthContext';

type HomeProps = NativeStackScreenProps<RootStackParamsList, 'Home'>;

const Home = ({navigation}: HomeProps): JSX.Element => {
  const {logout} = useContext(AuthContext);
  return (
    <>
      <View style={styles.cardsContainer}>
        <Pressable
          style={styles.card}
          onPress={() => navigation.navigate('MusicPlayer')}>
          <Text>Music Player</Text>
        </Pressable>
        <Pressable
          style={styles.card}
          onPress={() => navigation.navigate('TicTacToe')}>
          <Text>Tic Tac Toe</Text>
        </Pressable>
        <Pressable
          style={styles.card}
          onPress={() => navigation.navigate('CurrencyConverter')}>
          <Text>Currency Converter</Text>
        </Pressable>
        <Pressable
          style={styles.card}
          onPress={() => navigation.navigate('RollTheDice')}>
          <Text>Roll the Dice</Text>
        </Pressable>
        <Pressable
          style={styles.card}
          onPress={() => navigation.navigate('TrendingProducts')}>
          <Text>Trending Products</Text>
        </Pressable>
      </View>
      <Pressable onPress={() => logout()}>
        <Icon name="logout" size={38} />
      </Pressable>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  cardsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 20,
  },
  card: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    elevation: 3,
    flex: 0.5,
    maxWidth: '45%',
    minWidth: '45%',
  },
});
