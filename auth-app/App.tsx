import {NavigationContainer} from '@react-navigation/native';
import Route from './source/route';
import {Provider} from 'react-redux';
import store from './source/redux/Store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Route />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
