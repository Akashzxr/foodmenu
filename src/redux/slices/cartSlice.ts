import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface cartItem {
  id: string
  name: string
  type: string
  price: number
  quantity: number
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
      const existingItem = state.cartItems.find((item) => item.id === action.payload.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 })
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
    },
    incrementItem: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementItem: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
})

export const { addCartItem, removeItem, decrementItem, incrementItem } = cartSlice.actions
export default cartSlice.reducer
