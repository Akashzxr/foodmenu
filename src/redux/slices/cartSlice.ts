import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface cartItem {
  id: string
  name: string
  type: string
  price: number
  image: []
}

interface CartState {
  cartItems: cartItem[]
}

const initialState: CartState = {
  cartItems: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem(state, action: PayloadAction<cartItem>) {
      state.cartItems.push(action.payload)
      // console.log(action.payload);
      // console.log(state.cartItems)
    },
    decrementCartCount(state) {},
  },
})

export const { addCartItem } = cartSlice.actions
export default cartSlice.reducer
