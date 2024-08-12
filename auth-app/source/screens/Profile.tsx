// components/Profile.tsx
import React, {useEffect} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/Store';
import {fetchUserProfile} from '../redux/Profile';

const Profile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {profileData, loading, error} = useSelector(
    (state: RootState) => state.profile,
  );

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>
          Error: {typeof error === 'string' ? error : JSON.stringify(error)}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {profileData ? (
        <View>
          <Text>Name: {profileData.name}</Text>
          <Text>Email: {profileData.email}</Text>
          <Text>Username: {profileData.username}</Text>
          {/* Add other profile fields as needed */}
        </View>
      ) : (
        <Text>No profile data</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Profile;
