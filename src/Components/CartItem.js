import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../Global/colors';

const CartItem = ({ item, onRemove }) => {
  const handleRemoveItem = () => {
    Alert.alert(
      'Eliminar Artículo',
      '¿Estás seguro de que deseas eliminar este artículo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', onPress: () => onRemove() },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text1}>{item.title}</Text>
        <Text style={styles.text2}>{item.brand}</Text>
        <Text style={styles.text2}>Cantidad: {item.quantity} Precio: ${item.price}</Text>
      </View>
      <TouchableOpacity onPress={handleRemoveItem}>
        <Feather name="trash-2" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );
};

export default CartItem

const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.green3,
      margin: 10,
      padding: 15,
      height: 120,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: 10,
      borderWidth: 2,
    },
    textContainer: {
      width: "70%",
      gap: 5,
    },
    text1: {
      fontSize: 19,
      color: colors.lightGray,
    },
    text2: {
      fontSize: 17,
      color: colors.lightGray,
    },
  });
  