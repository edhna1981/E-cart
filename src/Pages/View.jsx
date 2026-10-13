import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import Header from '../Components/Header'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlist } from '../Redux/slice/wishlistSlice'
import { addToCart } from '../Redux/slice/cartSlice'

function View() {
  const {id}=useParams() // to get id from patch
  const[product,setProduct]=useState({})
  const{wishlist}=useSelector(state=>state.wishlistReducer)
  const cart=useSelector(state=>state.cartReducer)
  const dispatch=useDispatch()

  useEffect(()=>{
    const allProducts=JSON.parse(localStorage.getItem("allProducts"))
    // console.log(allProducts);
    setProduct(allProducts.find(item=>item.id==id))
    
  },[])


  const handleWishlist=(product)=>{
      const existingProduct=wishlist.find(item=>item.id==product.id)
      if(existingProduct){
        alert("product already added to wishlist")
      }else{
        dispatch(addToWishlist(product))
        alert("product added to wishlist")
      }
    }
  
    const handleCart=(product)=>{
      const existingProduct=cart?.find(item=>item.id==product.id)
      if(existingProduct){
        dispatch(addToCart(product))
        alert("Items added")
      }else{
        dispatch(addToCart(product))
        alert("Item added")
      }
    }


  return (
    <>
    <Header/>
    <div style={{marginTop:"200px"}}>
      <div className='row w-100 container'>
        <div className='col-lg-4 mt-5'>
          <img src={product.thumbnail} alt="" />
        </div>
        <div className='col-lg-2'></div>
        <div className='col-lg-6 mt-5'>
          <p>pid:{product.id}</p>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <h3>Price: <span className='text-danger'>{product.price}</span></h3>
          <div className='d-flex justify-content-between'>
            <Button onClick={()=>handleWishlist(product)} className='btn btn-outline-info rounded'>wishlist<i className="fa-solid fa-heart text-danger"></i></Button>
            <Button onClick={()=>handleCart(product)}  className='btn btn-outline-info rounded'>Cart<i className="fa-solid fa-cart-shopping text-success"></i></Button>
          </div>

        </div>

      </div>

    </div>
      
    </>
  )
}

export default View
