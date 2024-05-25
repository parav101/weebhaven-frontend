import { createSlice  } from "@reduxjs/toolkit";

const intialValue:{productId:string,productEntryId:string,quantity:number}[]= [];
let index = 0;

export const cartSlice = createSlice({
  name: "cart",
  initialState: { value: intialValue },
  reducers: {
    addItem: (state, action) => {
      console.log(state.value)
      index = 0;
      // index = state.value.findIndex(item => item.productId ===action.payload.productId);
      index = state.value.findIndex(item => item.productEntryId ===action.payload.productEntryId);
      if (index === -1) state.value.push(action.payload);
      else {
        let oldQuantity = state.value[index].quantity
        const updatedObj = {...state.value[index],quantity:oldQuantity +1}
        state.value = [
            ...state.value.slice(0, index),
            updatedObj,
            ...state.value.slice(index + 1),
          ];
      }
 
    },
    emptyCart: (state) => {
      state.value = structuredClone(intialValue);
    },
    removeItem: (state, action) => {
      index = state.value.findIndex(item => item.productEntryId ===action.payload.productEntryId);
      console.log(index)
      if(index !== -1) {
        state.value = [
          ...state.value.slice(0, index),
          ...state.value.slice(index + 1),
        ];
      }
    },
    updateQuantity: (state, action) => {
      index = 0;
      index = state.value.findIndex(item => item.productEntryId ===action.payload.productEntryId);
      const total = state.value[index].quantity + action.payload.newQuantity
      if (index != -1) 
      {
        const updatedObj = {...state.value[index],quantity:total}
        state.value = [
            ...state.value.slice(0, index),
            updatedObj,
            ...state.value.slice(index + 1),
          ];
      }
    },
  },
});

export const { addItem, emptyCart, removeItem ,updateQuantity} = cartSlice.actions;

export default cartSlice.reducer;
