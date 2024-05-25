import {createSlice} from "@reduxjs/toolkit"


let intialValue = {serach:""}

export const serachSlice = createSlice({
    name:"search",
    initialState:{value:intialValue},
    reducers:{
        querySerach:(state, action)=>{
            state.value = action.payload
        }
    },
})

export const {querySerach} =serachSlice.actions;

export default serachSlice.reducer;