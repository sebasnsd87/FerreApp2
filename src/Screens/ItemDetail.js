import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { colors } from '../Global/colors';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, clearCart } from '../features/cart/cartSlice';

const ItemDetail = ({ item, route }) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.shop.value.productSelected);
  const images = product.images ? product.images : [];
  const [quantity, setQuantity] = useState(1);

  const imageUrl = images.length > 0 ? images[0] : null;

  const handleAddToCart = () => {
    if (quantity > 0 && quantity <= product.stock) {
      for (let i = 0; i < quantity; i++) {
        dispatch(addItem({ ...product, quantity: 1 }));
      }
      setQuantity(1);
    } else {
      alert('La cantidad seleccionada excede el stock disponible o es inválida');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {!imageUrl ? (
          <Text style={styles.errorText}>Error al cargar la imagen</Text>
        ) : (
          <Image
            style={styles.image}
            resizeMode='cover'
            source={{ uri: item.thumbnail }}
          />
        )}
        <View style={styles.containerText}>
          <Text style={styles.title}>{product.title}</Text>
          <Text>{product.description}</Text>
          <View style={styles.quantityContainer}>
            <Pressable onPress={() => setQuantity(quantity - 1)}>
              <Text style={styles.quantityButton}>-</Text>
            </Pressable>
            <Text style={styles.quantity}>{quantity}</Text>
            <Pressable onPress={() => setQuantity(quantity + 1)}>
              <Text style={styles.quantityButton}>+</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.containerPrice}>
        <Text style={styles.price}>$ {product.price}</Text>
        <Pressable style={styles.buyNow} onPress={handleAddToCart}>
          <Text style={styles.buyNowText}>Agregar al Carrito</Text>
        </Pressable>
      </View>
    </View>
    </View>
  );
};

export default ItemDetail;


const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.green2
  },
  content: {
    width: "80%",
    height: "30%",
  },
  errorText: {
    fontSize: 20,
    color: 'red',
    textAlign: 'center',
    fontFamily: "Lobster"
  },
  image: {
    width: 100,
    height: 100,
  },
  containerText: {
    gap: 25,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    paddingHorizontal: 5,
    paddingVertical: 25,
  },
  containerPrice: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: "Josefin"
  },
  price: {
    fontSize: 30,
    textAlign: 'center',
  },
  buyNow: {
    backgroundColor: colors.green1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buyNowText: {
    color: "white",
    textAlign: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    fontSize: 20,
    color: colors.green1,
    marginHorizontal: 30,
  },
});
