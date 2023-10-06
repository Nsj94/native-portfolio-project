import {NavigationContainer} from '@react-navigation/native';
import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

const Router = () => {
  const {isLoggedIn} = useContext(AuthContext);
  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Router;

const styles = StyleSheet.create({});
