import React from 'react';
import {Text} from 'react-native';
import {Provider} from 'react-redux';
import {store, persistor} from 'store';
import {PersistGate} from 'redux-persist/integration/react';
import {Navigation} from 'navigation/navigation';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
}

export default App;
