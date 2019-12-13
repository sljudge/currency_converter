import React, { Component } from 'react'
import { View, StatusBar, KeyboardAvoidingView } from 'react-native'

import { Container } from '../components/Container'
import { Logo } from '../components/Logo'
import { InputWithButton } from '../components/TextInput'
import { ClearButton } from '../components/Button'
import { Header } from '../components/Header'

const TEMP_BASE_CURRENCY = 'GBP'
const TEMP_QUOTE_CURRENCY = 'EUR'
const TEMP_BASE_PRICE = '100'
const TEMP_QUOTE_PRICE = '118.84'

class Home extends Component {

    handlePressBaseCurrency = () => {
        console.log('PRESS BASE')
    }

    handlePressQuoteCurrency = () => {
        console.log('PRESS QUOTE')
    }

    handleTextChange = (text) => {
        console.log('TEXT CHANGE: ', text)
    }

    handleSwapCurrency = () => {
        console.log('PRESS SWAP CURRENCY')
    }

    handleOptionsPress = () => {
        console.log('PRESS OPTIONS')
    }

    render() {
        return (
            <Container>

                <StatusBar translucent={false} barStyle="light-content" />
                {/* translucent for android and barStyle for IOS */}

                <Header onPress={this.handleOptionsPress} />

                <KeyboardAvoidingView behavior="padding">
                    <Logo />
                    <InputWithButton
                        buttonText={TEMP_BASE_CURRENCY}
                        onPress={this.handlePressBaseCurrency}
                        defaultValue={TEMP_BASE_PRICE}
                        keyboardType="numeric"
                        onChangeText={this.handleTextChange}
                    />
                    <InputWithButton
                        buttonText={TEMP_QUOTE_CURRENCY}
                        onPress={this.handlePressQuoteCurrency}
                        editable={false}
                        value={TEMP_QUOTE_PRICE}
                    />
                    <ClearButton
                        text="Reverse Currencies"
                        onPress={this.handleSwapCurrency}
                    />
                </KeyboardAvoidingView>

            </Container>
        )
    }
}

export default Home