import React from 'react';
import {LoanAmountScreen} from './src/screens';
import {SafeAreaView} from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <LoanAmountScreen />
    </SafeAreaView>
  );
};

export default App;
