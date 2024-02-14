import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {
    user:"sebasduarte87",
    items:[],
    total:null,
    updateAt:""
  }
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem:(state,actions)=>{
        state.value.items.push({...actions.payload,quantity:1})
        console.log(state.value.items)
    },
    removeItem:() =>{

    }
  },
})


export const { addItem,removeItem} = cartSlice.actions

export default cartSlice.reducer