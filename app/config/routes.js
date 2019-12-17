import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Home from '../screens/Home'
import CurrencyList from '../screens/CurrencyList'
import Options from '../screens/Options'
import Themes from '../screens/Themes'

const HomeStack = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            header: () => null
        }
    },
    Options: {
        screen: Options,
        navigationOptions: {
            headerTitle: 'Options'
        }
    },
    Themes: {
        screen: Themes,
        navigationOptions: {
            headerTitle: 'Themes'
        }
    }
}, {
    headerMode: 'screen'
})

const CurrencyListStack = createStackNavigator({
    CurrencyList: {
        screen: CurrencyList,
        navigationOptions: ({ navigation }) => ({
            headerTitle: navigation.state.params.title
        })
    }
})

const RootStack = createStackNavigator({
    Home: {
        screen: HomeStack
    },
    CurrencyList: {
        screen: CurrencyListStack
    }
}, {
    initialRouteName: 'Home',
    mode: 'modal',
    headerMode: 'none'
})

const AppContainer = createAppContainer(RootStack);

export default AppContainer
