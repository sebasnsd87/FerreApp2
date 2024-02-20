import React from 'react';
import { StyleSheet, Text, View, FlatList, Pressable, Alert } from 'react-native';
import CartItem from '../Components/CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, clearCart } from '../features/cart/cartSlice';
import { usePostOrdersMutation } from '../app/service/shopService';

const Cart = () => {
  const cart = useSelector(state => state.cart.value);
  const dispatch = useDispatch();
  const [triggerPostOrder] = usePostOrdersMutation();

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem({ id: itemId }));
  };

  const handleConfirmOrder = () => {
    Alert.alert(
      'Confirmar Compra',
      '¿Estás seguro de que deseas realizar la compra?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', onPress: () => handleConfirm() },
      ]
    );
  };

  const handleConfirm = () => {
    dispatch(clearCart());
    triggerPostOrder(cart);
    Alert.alert('Compra realizada', '¡Gracias por tu compra!');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cart.items}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <CartItem item={item} onRemove={() => handleRemoveItem(item.id)} />}
      />
      <View style={styles.confirmContainer}>
        <Pressable onPress={handleConfirmOrder}>
          <Text style={styles.text}>Confirmar</Text>
        </Pressable>
        <Text style={styles.text}>Total: $ {cart.total} </Text>
      </View>
    </View>
  );
}

export default Cart;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 130
  },
  confirmContainer: {
    backgroundColor: "grey",
    padding: 25,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: "white",
  }
});
