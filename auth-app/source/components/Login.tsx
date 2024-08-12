import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {registerUser} from '../redux/LoginSlice';
import {AppDispatch, RootState} from '../redux/Store';
import {NavigationType} from '..';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const {loading, error, userData} = useSelector(
    (state: RootState) => state.login,
  );
  const navigation: NavigationType = useNavigation();
  const handleLogin = () => {
    dispatch(registerUser({email, password}));
  };

  useEffect(() => {
    if (userData) {
      navigation.navigate('profile');
    }
  }, [userData, navigation]);

  return (
    <View>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputView}>
        <TextInput
          placeholder="email"
          value={email}
          onChangeText={setEmail}
          style={styles.placeHolder}
        />
        <TextInput
          placeholder="password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.placeHolder}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
        <Pressable
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}>
          <Text style={styles.buttonText}>
            {loading ? 'Logging in...' : 'Login'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  placeHolder: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    width: 300,
    marginVertical: '2%',
  },
  button: {
    backgroundColor: '#000f2d',
    padding: 10,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: '5%',
  },
  buttonText: {
    fontSize: 13,
    color: '#fff',
  },
  title: {
    fontSize: 15,
    alignSelf: 'center',
    fontStyle: 'italic',
    fontWeight: '900',
    color: '#00000fff',
    marginVertical: '5%',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default Login;
