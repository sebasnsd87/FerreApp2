import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../Global/colors';
import CardShadow from '../Wrappers/CardShadow';
import { useDispatch } from 'react-redux';
import { setProductsFilteredByCategory } from "../features/shop/shopSlice";

const CategoryItem = ({ category, navigation }) => {
  const dispatch = useDispatch();

  return (
    <Pressable
      onPress={() => {
        dispatch(setProductsFilteredByCategory(category));
        navigation.navigate("Category", { category });
      }}
    >
      <CardShadow style={styles.container}>
        <Text style={styles.text}>{category}</Text>
      </CardShadow>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%', 
    margin: 5,
    backgroundColor: colors.green2,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    color: colors.black,
    fontFamily: "Josefin"
  },
});

export default CategoryItem;
