import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {moderateScale} from '../utils/Scaling';

const Header = ({title}) => (
  <View style={styles.container}>
    <Text style={styles.header}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F3F6',
    padding: 20,
  },
  header: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#0F0B28',
  },
});

export default Header;
