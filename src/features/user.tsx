import {createSlice} from "@reduxjs/toolkit"


let intialValue = {username:"",email:"",id:""}

export const userSlice = createSlice({
    name:"user",
    initialState:{value:intialValue},
    reducers:{
        login:(state, action)=>{
            state.value = action.payload
        },
        logout:(state)=>{
            state.value =intialValue
        }
    },
})

export const {login,logout} =userSlice.actions;

export default userSlice.reducer;