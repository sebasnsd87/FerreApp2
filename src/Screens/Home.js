import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import Categories from '../Components/Categories';

const Home = ({ navigation, route }) => {
  return (
    
      <Categories navigation={navigation} route={route} />
    
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
