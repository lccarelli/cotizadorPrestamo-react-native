import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  YellowBox,
  Button
} from 'react-native';
import Footer from './src/components/Footer';
import Form from './src/components/Form';
import colors from './src/utils/colors';
import ResultCalculation from './src/components/ResultCalculation';

YellowBox.ignoreWarnings(['Picker has been extracted']);

export default function App() {

  const [capital, setCapital] = useState(null);
  const [interest, setInterest] = useState(null);
  const [months, setMonths] = useState(null);
  const [total, setTotal] = useState(null);
  const [errorMessage, seterrorMessag] = useState('');
  console.log('total->', total);

  useEffect(() => {
    (capital && interest && months) ? calculate() : reset();
  }, [capital, interest, months])

  const calculate = () => {
    reset();
    if (!capital) {
      seterrorMessag('Añade la cantidad de capital');
    } else if (!interest) {
      seterrorMessag('Añade el interés');
    } else if (!months) {
      seterrorMessag('Selecciona los meses a pagar');
    } else {
      const i = interest / 100;
      const fee = capital / ((1 - Math.pow(i + 1, -months)) / i);
      setTotal({
        monthlyFree: fee.toFixed(2).replace('.', ','),
        totalPayable: (fee * months).toFixed(2).replace('.', ','),
      });
      console.log('totalPayable->', (fee * months).toFixed(2).replace('.', ','));
    }
  };

  const reset = () => {
    seterrorMessag("");
    setTotal(null);
  };

  return (
    <>
      <StatusBar barStyle='light-content' />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.background} />
        <Text style={styles.titleApp}>Cotizador de Préstamos</Text>
        <Form
          setCapital={setCapital}
          setInterest={setInterest}
          setMonths={setMonths} />
      </SafeAreaView>
      <ResultCalculation
        errorMessage={errorMessage}
        capital={capital}
        interest={interest}
        months={months}
        total={total}
      />
      <Footer calculate={calculate} />
    </>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    height: 290,
    alignItems: 'center',
  },
  background: {
    backgroundColor: colors.PRIMARY_COLOR,
    height: 200,
    width: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'absolute',
    zIndex: -1
  },
  titleApp: {
    fontSize: 33,
    fontWeight: 'bold',
    marginTop: 40,
    color: colors.WHITE
  }
})