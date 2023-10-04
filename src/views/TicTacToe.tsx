import React, {useState} from 'react';
import {
  Button,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import Icons from '../components/Icons';

export default function TicTacToe(): JSX.Element {
  const [isCross, setIsCross] = useState<boolean>(false);
  const [winner, setWinner] = useState<string>('');
  const [gameState, setGameState] = useState(new Array(9).fill('empty', 0, 9));

  const resetGame = () => {
    setWinner('');
    setIsCross(false);
    setGameState(new Array(9).fill('empty', 0, 9));
  };

  const checkWinner = () => {
    if (
      gameState[0] === gameState[1] &&
      gameState[0] === gameState[2] &&
      gameState[0] !== 'empty'
    ) {
      setWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[3] !== 'empty' &&
      gameState[3] === gameState[4] &&
      gameState[4] === gameState[5]
    ) {
      setWinner(`${gameState[3]} won the game! 🥳`);
    } else if (
      gameState[6] !== 'empty' &&
      gameState[6] === gameState[7] &&
      gameState[7] === gameState[8]
    ) {
      setWinner(`${gameState[6]} won the game! 🥳`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[3] &&
      gameState[3] === gameState[6]
    ) {
      setWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[1] !== 'empty' &&
      gameState[1] === gameState[4] &&
      gameState[4] === gameState[7]
    ) {
      setWinner(`${gameState[1]} won the game! 🥳`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[5] &&
      gameState[5] === gameState[8]
    ) {
      setWinner(`${gameState[2]} won the game! 🥳`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[4] &&
      gameState[4] === gameState[8]
    ) {
      setWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[4] &&
      gameState[4] === gameState[6]
    ) {
      setWinner(`${gameState[2]} won the game! 🥳`);
    } else if (!gameState.includes('empty', 0)) {
      setWinner('Draw game... ⌛️');
    }
  };

  const onChange = (item: number) => {
    if (winner) {
      return Snackbar.show({
        text: winner,
      });
    }
    if (gameState[item] !== 'empty') {
      return Snackbar.show({
        text: 'Postioned is Already Filled',
      });
    }
    gameState[item] = isCross ? 'cross' : 'circle';
    setIsCross(!isCross);
    checkWinner();
  };

  return (
    <SafeAreaView>
      <Text style={styles.pageTitle}>TicTacToe Game</Text>
      <View style={styles.mainContainer}>
        <View
          style={[
            styles.header,
            isCross
              ? // eslint-disable-next-line react-native/no-inline-styles
                {backgroundColor: 'green'}
              : // eslint-disable-next-line react-native/no-inline-styles
                {backgroundColor: 'orange'},
          ]}>
          <Text style={styles.headerText}>
            {isCross ? "Player X's Turn" : "Player O's Turn"}
          </Text>
        </View>
        <FlatList
          data={gameState}
          style={styles.gameContainer}
          numColumns={3}
          renderItem={({item, index}) => (
            <Pressable onPress={() => onChange(index)} style={styles.gameTile}>
              <Icons name={item} />
            </Pressable>
          )}
        />
        <Button title={`${winner ? 'Reset' : 'Reload'}`} onPress={resetGame} />
        {winner && (
          <View style={styles.winnerContainer}>
            <Text style={styles.winnerText}>{winner}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '500',
    backgroundColor: '#0088EE',
    color: '#fff',
    padding: 10,
    borderBottomRightRadius: 30,
  },
  gameContainer: {marginBottom: 20, marginTop: 20},
  gameTile: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f1f1f1',
    borderWidth: 0.5,
  },
  header: {
    padding: 10,
  },
  winnerContainer: {
    marginTop: 10,
    padding: 10,
    elevation: 4,
    backgroundColor: '#fff',
  },
  winnerText: {
    fontSize: 20,
    textTransform: 'capitalize',
    textAlign: 'center',
    color: '#000',
    fontWeight: '500',
  },
  headerText: {color: 'white'},
});
