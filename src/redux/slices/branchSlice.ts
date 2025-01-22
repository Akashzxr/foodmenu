import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Branch {
  id: string
  name: string
  location: number[]
  radius: number
}

interface Item {
  id: string
  name: string
  type: string
  price: number
  offerPrice: number
  description: string
  image: {
    url: string
    altText?: string
  }
}

interface BranchState {
  branch: Branch | null
  items: Item[]
  value: number
}

const initialState: BranchState = {
  branch: null,
  items: [],
  value: 0,
}

const branchSlice = createSlice({
  name: 'branch',
  initialState,
  reducers: {
    setBranch(state, action: PayloadAction<Branch>) {
      state.branch = action.payload;
    },
    setItems(state, action: PayloadAction<Item[]>) {
      state.items = action.payload;
      
      
      console.log(state.items);
    },
    increment(state) {
      state.value += 1;
      alert(state.value);
    },
  },
})

export const { setBranch, setItems, increment } = branchSlice.actions
export default branchSlice.reducer
