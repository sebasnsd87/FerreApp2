import React from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import CartItem from '../Components/CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../features/cart/cartSlice';
import { usePostOrdersMutation } from '../app/service/shopService';

const Cart = () => {
  const cart = useSelector(state => state.cart.value);
  const dispatch = useDispatch();
  const [triggerPostOrder] = usePostOrdersMutation();

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem({ id: itemId }));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cart.items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <CartItem item={item} onRemove={() => handleRemoveItem(item.id)} />}
      />
      <View style={styles.confirmContainer}>
        <Pressable onPress={() => triggerPostOrder(cart)}>
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
