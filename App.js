import React, { useState } from 'react';
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

YellowBox.ignoreWarnings(['Picker has been extracted']);

export default function App() {

  const [capital, setCapital] = useState(null);
  const [interest, setInterest] = useState(null);
  const [months, setMonths] = useState(null);
  const [total, settotal] = useState(null);
  console.log('total->', total);

  const calculate = () => {
    if (!capital) {
      console.log('Añade la cantidad de capital');
    } else if (!interest) {
      console.log('Añade el interés');
    } else if (!months) {
      console.log('Selecciona los meses a pagar');
    } else {
      const i = interest / 100;
      const fee = capital / ((1 - Math.pow(i + 1, -months)) / i);
      settotal({
        monthlyFree: fee.toFixed(2).replace('.', ','),
        totalPayable: (fee * months).toFixed(2).replace('.', ','),
      });
      console.log('totalPayable->', (fee * months).toFixed(2).replace('.', ','));
    }
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
      <View>
        <Text>Resultado</Text>
      </View>
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
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 25,
    color: colors.WHITE
  }
})