import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {moderateScale} from '../utils/Scaling';

const Button = ({loanAmount, onPress, title}) => (
  <TouchableOpacity
    disabled={loanAmount < 4999}
    style={{
      ...styles.submitButton,
      backgroundColor: loanAmount > 4999 ? '#714FFF' : '#714FFF90',
    }}
    onPress={onPress}>
    <Text style={styles.submitButtonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  submitButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: moderateScale(14),
    fontWeight: '700',
  },
});

export default Button;
