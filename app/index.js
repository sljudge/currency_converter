import React from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'

import Home from './screens/Home'
import CurrencyList from './screens/CurrencyList'
import Options from './screens/Options'

EStyleSheet.build({
  $primaryBlue: '#4F6D7A',
  $white: '#fff',
  $border: '#E2E2E2',
  $inputText: '#797979',
  $lightGrey: '#F0F0F0',
  $darkText: '#343434',

  // $outline: 1

})


export default () => <Options />