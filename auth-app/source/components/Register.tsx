import React, {useState, useEffect} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/Store';
import {registerUser} from '../redux/authSlice';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const {loading, error, userData} = useSelector(
    (state: RootState) => state.auth,
  );

  const handleRegister = () => {
    dispatch(registerUser({name, email, username, password}));
  };

  useEffect(() => {
    if (userData) {
      console.log('User registered successfully:', userData.message);
      ToastAndroid.showWithGravityAndOffset(
        userData.message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
  }, [userData]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration</Text>
      <View style={styles.inputView}>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={styles.placeHolder}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.placeHolder}
        />
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.placeHolder}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.placeHolder}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
        <Pressable
          style={styles.button}
          onPress={handleRegister}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Register</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    paddingHorizontal: 10,
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

export default Register;
