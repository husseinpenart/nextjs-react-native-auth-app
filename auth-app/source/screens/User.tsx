import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Register from '../components/Register';
import Login from '../components/Login';

const User = () => {
  const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(false);
  const registerButton = () => {
    setRegister(!register);
    setLogin(false);
    console.log('register part');
  };
  const LoginButton = () => {
    setLogin(true);
    setRegister(false);
    console.log('Login part');
  };
  return (
    <View style={styles.ViewItems}>
      <View style={styles.buttons}>
        <Pressable style={styles.button} onPress={LoginButton}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={registerButton}>
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>
      </View>
      {register ? <Register /> : login ? <Login /> : <Register />}
    </View>
  );
};

const styles = StyleSheet.create({
  ViewItems: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#000345',
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
    borderLeftColor: '#000',
    borderLeftWidth: 5,
  },
  buttons: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    gap: 10,
  },
});

export default User;
