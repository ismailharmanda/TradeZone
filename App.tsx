import React from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProductsScreen} from 'screens/Products';
import {Provider} from 'react-redux';
import {store, persistor} from 'store';
import {PersistGate} from 'redux-persist/integration/react';
import {SCREENS} from 'config/screens';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name={SCREENS.PRODUCTS} component={ProductsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
