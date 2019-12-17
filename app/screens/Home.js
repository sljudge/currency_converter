import React, { Component } from 'react'
import { StatusBar, KeyboardAvoidingView } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Container } from '../components/Container'
import { Logo } from '../components/Logo'
import { InputWithButton } from '../components/TextInput'
import { ClearButton } from '../components/Button'
import { Header } from '../components/Header'
import { LastConverted } from '../components/Text'
import { connectAlert } from '../components/Alert'

import { swapCurrency, changeCurrencyAmount, getInitialConversion } from '../actions/currencies'

class Home extends Component {
    static propTypes = {
        navigation: PropTypes.object,
        dispatch: PropTypes.func,
        baseCurrency: PropTypes.string,
        quoteCurrency: PropTypes.string,
        amount: PropTypes.number,
        conversionRate: PropTypes.number,
        isFetching: PropTypes.bool,
        lastConvertedDate: PropTypes.object,
        primaryColor: PropTypes.string,
        alertWithType: PropTypes.func,
        currencyError: PropTypes.string
    }

    componentDidMount() {
        this.props.dispatch(getInitialConversion())
    }

    handlePressBaseCurrency = () => {
        console.log('PRESS BASE')
        this.props.navigation.navigate('CurrencyList', { title: 'Base Currency', type: 'base' })
    }

    handlePressQuoteCurrency = () => {
        console.log('PRESS QUOTE')
        this.props.navigation.navigate('CurrencyList', { title: 'Quote Currency', type: 'quote' })
    }

    handleTextChange = (amount) => {
        this.props.dispatch(changeCurrencyAmount(amount))
    }

    handleSwapCurrency = () => {
        this.props.dispatch(swapCurrency())
    }

    handleOptionsPress = () => {
        console.log('PRESS OPTIONS')
        this.props.navigation.navigate('Options')
    }

    render() {
        let quotePrice = (this.props.amount * this.props.conversionRate).toFixed(2)
        if (this.props.isFetching) {
            quotePrice = '...'
        }
        console.log('QUOTE_PRICE: ', quotePrice)

        return (
            <Container backgroundColor={this.props.primaryColor}>

                <StatusBar translucent={false} barStyle="light-content" />
                {/* translucent for android and barStyle for IOS */}

                <Header onPress={this.handleOptionsPress} />

                <KeyboardAvoidingView behavior="padding">
                    <Logo tintColor={this.props.primaryColor} />
                    <InputWithButton
                        buttonText={this.props.baseCurrency}
                        onPress={this.handlePressBaseCurrency}
                        defaultValue={this.props.amount.toString()}
                        keyboardType="numeric"
                        onChangeText={this.handleTextChange}
                        textColor={this.props.primaryColor}
                    />
                    <InputWithButton
                        buttonText={this.props.quoteCurrency}
                        onPress={this.handlePressQuoteCurrency}
                        editable={false}
                        value={quotePrice}
                        textColor={this.props.primaryColor}
                    />
                    <LastConverted
                        date={this.props.lastConvertedDate}
                        base={this.props.baseCurrency}
                        quote={this.props.quoteCurrency}
                        conversionRate={this.props.conversionRate}
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

const mapStateToProps = (state) => {
    const baseCurrency = state.currencies.baseCurrency
    const quoteCurrency = state.currencies.quoteCurrency
    const conversionSelector = state.currencies.conversions[baseCurrency] || {}
    const rates = conversionSelector.rates || {}
    return {
        baseCurrency,
        quoteCurrency,
        amount: state.currencies.amount,
        conversionRate: rates[quoteCurrency] || 0,
        isFetching: conversionSelector.isFetching,
        lastConvertedDate: conversionSelector.date ? new Date(conversionSelector.date) : new Date(),
        primaryColor: state.theme.primaryColor,
        currencyError: state.currencies.error
    }
}

export default connect(mapStateToProps)(connectAlert(Home))