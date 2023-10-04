import React from 'react';
import {PropsWithChildren} from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type IconProps = PropsWithChildren<{
  name: string;
}>;

function Icons({name}: IconProps): JSX.Element {
  switch (name) {
    case 'circle':
      return (
        <Icon name="circle-thin" style={styles.icon} size={24} color="orange" />
      );
    case 'cross':
      return <Icon name="times" style={styles.icon} size={24} color="green" />;
    default:
      return (
        <Icon name="pencil" style={styles.icon} size={24} color={'black'} />
      );
  }
}

export default Icons;

const styles = StyleSheet.create({
  icon: {},
});
