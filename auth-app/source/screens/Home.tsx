import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {NavigationType} from '..';

const Home = () => {
  const navigation: NavigationType = useNavigation();

  return (
    <View style={styles.view}>
      <Text style={styles.title}>hi welcome to react-native auth app</Text>
      <Image source={require('../assets/3977731.webp')} style={styles.image} />
      <Pressable
        onPress={() => navigation.navigate('user')}
        style={styles.pressable}>
        <Text style={styles.buttontext}>register and login</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  title: {
    textTransform: 'capitalize',
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: 'black',
    marginVertical: '5%',
  },
  image: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    marginVertical: '5%',
  },
  pressable: {
    borderWidth: 1,
    borderColor: '#000f2d',
    padding: 10,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 24,
  },
  buttontext: {
    fontSize: 13,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#000',
  },
});
export default Home;
