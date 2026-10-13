import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchProducts=createAsyncThunk('products/fetchProducts',async()=>{
    const result=await axios.get('https://dummyjson.com/products')
    localStorage.setItem("allProducts",JSON.stringify(result.data.products))
    // console.log(result.data.products);
    return result.data.products
    
})


const productSlice= createSlice({
    name:"products",
    initialState:{
        allProducts:[],
        allProductsDummy:[],
        error:"",
        loading:false

    },
    reducers:{
        searchProducts:(state,action)=>{
            state.allProducts=state.allProductsDummy.filter(item=>item.title.toLowerCase().
            includes(action.payload))
        }

    },
    extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      // Add user to the state array
      state.allProducts=action.payload,
      state.allProductsDummy=action.payload,
      state.loading=false
    }),
    builder.addCase(fetchProducts.pending, (state) => {
      // Add user to the state array
      state.allProducts=[]
      state.allProductsDummy=[]
      state.loading=true
    }),
    builder.addCase(fetchProducts.rejected, (state, ) => {
      // Add user to the state array
      state.allProducts=[],
      state.loading=false,
      state.error="api failed"
    })
    },


})
export const{searchProducts} = productSlice.actions
export default productSlice.reducer