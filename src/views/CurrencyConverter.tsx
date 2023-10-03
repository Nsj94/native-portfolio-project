import React, {useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import CurrenyButton from '../components/CurrenyButton';
import {currencyByRupee} from '../constants/constants';

export default function CurrencyConverter() {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');

  const reset = () => {
    setInputValue('');
    setResult('');
    setTargetCurrency('');
  };

  const convertCurrency = (targetValue: Currency) => {
    if (!inputValue) {
      reset();
      return Snackbar.show({
        text: 'Please Enter a Value First',
        textColor: 'white',
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: 'UNDO',
          textColor: 'white',
        },
      });
    }
    const inputAmount = parseFloat(inputValue);
    if (isNaN(inputAmount)) {
      reset();
      return Snackbar.show({
        text: 'Please Enter a Valid Input',
        textColor: 'white',
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: 'UNDO',
          textColor: 'white',
        },
      });
    }
    const convertedValue = inputAmount * targetValue.value;

    setResult(
      ` ${targetValue.symbol} ${convertedValue.toFixed(2)} - ${
        targetValue.flag
      }`,
    );
    setTargetCurrency(targetValue.name);
  };
  return (
    <ScrollView>
      <Text style={styles.heading}>Currency Converter</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.rupeeIcon}>₹</Text>
        <TextInput
          style={styles.input}
          clearButtonMode="always"
          keyboardType="number-pad"
          placeholder="Enter Currency in Rupees"
          value={inputValue}
          onChangeText={setInputValue}
        />
        <TouchableOpacity style={styles.resetBtn} onPress={reset}>
          <Text style={styles.resetTxt}>Reset</Text>
        </TouchableOpacity>
      </View>
      {result ? (
        <View style={styles.resultCard}>
          <Text style={styles.resultText}>{result}</Text>
        </View>
      ) : null}
      <FlatList
        style={styles.container}
        numColumns={3}
        data={currencyByRupee}
        keyExtractor={item => item.name}
        renderItem={({item}) => {
          return (
            <Pressable
              style={[
                styles.card,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  backgroundColor:
                    targetCurrency === item.name ? 'lightgray' : '#f2f2f2',
                },
              ]}
              onPress={() => convertCurrency(item)}>
              <CurrenyButton {...item} />
            </Pressable>
          );
        }}
      />
      <Image
        source={require('../assets/currency/rupee.jpg')}
        style={styles.bottomImg}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: '500',
    backgroundColor: '#0088EE',
    color: '#fff',
    padding: 10,
    borderBottomRightRadius: 30,
  },
  container: {
    margin: 10,
  },
  card: {
    flex: 1,
    margin: 8,
    elevation: 1,
    shadowColor: '#333',
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 8,
  },
  rupeeIcon: {
    fontSize: 18,
  },
  input: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    borderBottomWidth: 0.5,
  },
  resultCard: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 24,
    color: '#000',
  },
  resetBtn: {
    backgroundColor: 'gray',
    padding: 8,
    borderRadius: 5,
  },
  resetTxt: {
    color: '#fff',
  },
  bottomImg: {
    height: 100,
    width: '100%',
    objectFit: 'cover',
    marginTop: 22,
  },
});
