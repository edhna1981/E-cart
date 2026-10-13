import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name:"cart",
    initialState:[],
    reducers:{
        addToCart:(state,action)=>{
            
            const existingProduct=state.find(item=>item.id==action.payload.id)
            if(existingProduct){
                existingProduct.quantity++
                existingProduct.totalPrice=existingProduct.price*existingProduct.quantity
                state=[existingProduct]
            }else{
                state.push({...action.payload,quantity:1,totalPrice:action.payload.price})
            }
        },
        increment:(state,action)=>{
            const existingProduct=state.find(item=>item.id==action.payload)
            if(existingProduct){
                existingProduct.quantity++
                existingProduct.totalPrice=existingProduct.price*existingProduct.quantity
            }
        },
        decrement:(state,action)=>{
            const existingProduct=state.find(item=>item.id==action.payload)
            if(existingProduct && existingProduct.quantity>1){
                existingProduct.quantity--
                existingProduct.totalPrice=existingProduct.price*existingProduct.quantity
            }
        },
        removeCart:(state,action)=>{
            return state=state.filter(item=>item.id!==action.payload)
        },
        emptyCart:(state)=>{
            return state=[]
        }
    }

})
export const{addToCart,increment,decrement,removeCart,emptyCart}=cartSlice.actions
export default cartSlice.reducer