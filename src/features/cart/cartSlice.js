import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    user: "sebasduarte87",
    items: [],
    total: null,
    updateAt: ""
  }
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState, 
  reducers: {
    addItem: (state, action) => {
      const foundItem = state.value.items.find(item => item.id === action.payload.id);

      if (foundItem) {
        foundItem.quantity++;
      } else {
        state.value.items.push({ ...action.payload, quantity: 1 });
      }

      state.value.total = state.value.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      state.value.updateAt = new Date().toLocaleString();
    },
    removeItem: (state, action) => {
      const itemIdToRemove = action.payload.id;
      state.value.items = state.value.items.filter(item => item.id !== itemIdToRemove);

      state.value.total = state.value.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      state.value.updateAt = new Date().toLocaleString();
    },
    clearCart: (state) => {
      state.value.items = [];
      state.value.total = 0;
      state.value.updateAt = new Date().toLocaleString();
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
