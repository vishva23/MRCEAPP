import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import RootNavigation from './src/navigation/RootNavigation';
import {configureStore, persistor} from './src/redux/store';

export default function App() {
  return (
    <Provider store={configureStore}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigation />
      </PersistGate>
    </Provider>
  );
}
