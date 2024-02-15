import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Entypo } from "@expo/vector-icons";
import { colors } from '../Global/colors';

const CartItem = ({ item, onRemove }) => {
    return (
      <View key={item.id} style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text1}>{item.title}</Text>
          <Text style={styles.text2}>Cantidad: {item.quantity} Precio $ {item.price}</Text>
        </View>
        <Pressable onPress={onRemove}>
          <Entypo name='trash' size={25} color="black" />
        </Pressable>
      </View>
    );
  }

export default CartItem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.green3,
    margin: 10,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2
  },
  textContainer: {
    width: "70%",
    gap: 5
  },
  text1: {
    fontSize: 19,
    color: colors.lightGray,
  },
  text2: {
    fontSize: 17,
    color: colors.lightGray,
  }
});
