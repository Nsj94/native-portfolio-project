import React, {useContext, useState} from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import {AuthContext} from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login}: any = useContext(AuthContext);

  return (
    <View style={styles.formContainer}>
      <View style={styles.formInputWrapper}>
        <TextInput
          style={styles.textInput}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter Email"
        />
      </View>
      <View style={styles.formInputWrapper}>
        <TextInput
          style={styles.textInput}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter Password"
          secureTextEntry
        />
      </View>
      <Button title="login" onPress={() => login(email, password)} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
    display: 'flex',
    gap: 20,
  },
  label: {
    color: '#000',
    fontSize: 16,
  },

  formInputWrapper: {},
  textInput: {
    borderBottomWidth: 0.5,
  },
});
