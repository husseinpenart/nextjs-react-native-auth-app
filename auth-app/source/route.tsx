import {createStackNavigator} from '@react-navigation/stack';
import User from './screens/User';
import Home from './screens/Home';
import Profile from './screens/Profile';

const Stack = createStackNavigator();

const Route = () => {
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen
        name="home"
        initialParams={Home}
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="user"
        component={User}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Route;
