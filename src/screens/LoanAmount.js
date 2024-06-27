import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  PanResponder,
  Dimensions,
} from 'react-native';
import Svg, {Circle, G} from 'react-native-svg';
import {Button, Header} from '../components';
import {moderateScale} from '../utils/Scaling';
import {Colors} from '../utils/Colors';
import {InfoIcon} from '../assets';

const {width} = Dimensions.get('window');

const LoanAmountScreen = () => {
  const [loanAmount, setLoanAmount] = useState(0);
  const maxLoanAmount = 10000;
  const radius = 90;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const centerX = width / 2;
  const centerY = width / 2;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        const {moveX, moveY} = gestureState;
        const x = moveX - centerX;
        const y = moveY - centerY;
        const angle = Math.atan2(y, x) + Math.PI / 2;
        const normalizedAngle = angle < 0 ? angle + 2 * Math.PI : angle;
        const loanAmountFromAngle =
          (normalizedAngle / (2 * Math.PI)) * maxLoanAmount;
        setLoanAmount(
          Math.min(Math.max(Math.round(loanAmountFromAngle), 0), maxLoanAmount),
        );
      },
    }),
  ).current;

  const handleTextChange = value => {
    const numericValue = Number(value.replace(/[^0-9]/g, ''));
    if (numericValue <= maxLoanAmount) {
      setLoanAmount(numericValue);
    } else {
      setLoanAmount(maxLoanAmount);
    }
  };

  return (
    <View style={styles.container}>
      <Header title={'Loan Amount'} />
      <View style={styles.bodyContainer}>
        <View style={styles.infoTextContainer}>
          <InfoIcon />
          <Text style={styles.infoText}>
            Minimum Loan Amount is{' '}
            <Text style={{color: Colors.darkBlue}}>₹5,000</Text>
          </Text>
        </View>

        <Text style={styles.subHeader}>Select a loan amount</Text>
        <Text style={styles.eligibleText}>
          You’re Eligible for a loan of up to{' '}
          <Text style={{color: Colors.purple}}>₹10,000 </Text>
        </Text>

        <View style={styles.sliderContainer} {...panResponder.panHandlers}>
          <Svg height="320" width="320" viewBox="0 0 200 200">
            <Circle
              cx="100"
              cy="100"
              r="90"
              stroke={Colors.lightGrey}
              strokeWidth={strokeWidth}
              fill="none"
            />
            <Circle
              cx="100"
              cy="100"
              r="90"
              stroke={Colors.purple}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={
                circumference - (loanAmount / maxLoanAmount) * circumference
              }
              rotation="-90"
              origin="100, 100"
            />
            <G rotation={(loanAmount / maxLoanAmount) * 360} origin="100, 100">
              <Circle cx="100" cy="10" r="10" fill={Colors.white} />
              <Circle cx="100" cy="10" r="5" fill={Colors.darkPurple} />
            </G>
          </Svg>
          <View style={styles.inputContainer}>
            <Text style={styles.loanText}>LOAN AMOUNT</Text>
            <TextInput
              style={styles.inputInsideCircle}
              value={`₹${loanAmount.toLocaleString()}`}
              keyboardType="numeric"
              onChangeText={handleTextChange}
            />
          </View>
        </View>
      </View>

      <View style={styles.btnContainer}>
        <Button loanAmount={loanAmount} onPress={() => {}} title={'Submit'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  bodyContainer: {
    padding: 20,
  },
  infoTextContainer: {
    marginBottom: 20,
    backgroundColor: Colors.lightBlue,
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: moderateScale(11),
    color: Colors.grey,
    marginLeft: 5,
  },
  subHeader: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    marginBottom: 5,
    color: Colors.textPrimary,
  },
  eligibleText: {
    fontSize: moderateScale(12),
    color: Colors.grey,
    marginBottom: 20,
    fontWeight: '600',
  },
  sliderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  inputContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  loanText: {
    fontSize: moderateScale(10),
    color: Colors.lightGrey,
  },
  inputInsideCircle: {
    width: 120,
    height: 50,
    textAlign: 'center',
    borderRadius: 12,
    fontSize: moderateScale(22),
    marginTop: 5,
    backgroundColor: Colors.backgroundGrey,
    color: Colors.textPrimary,
  },
  btnContainer: {
    position: 'absolute',
    bottom: 0,
    width: '90%',
    alignSelf: 'center',
  },
});

export default LoanAmountScreen;
