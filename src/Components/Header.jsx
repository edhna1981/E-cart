import React, { useEffect, useState } from 'react'
import { Badge, Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts } from '../Redux/slice/productSlice';



function Header({insideHome}) {

  const dispatch=useDispatch()
  const{wishlist}=useSelector(state=>state.wishlistReducer)
  const cart=useSelector(state=>state.cartReducer)

  const[wishlistCount,setWishlistCount]=useState(0)
  const[cartCount,setCartCount]=useState(0)

  useEffect(()=>{
    setWishlistCount(wishlist.length)
    setCartCount(cart.length)
  },[wishlist,cart])

  return (
    <>
      <Navbar expand="lg" className="bg-info">
      <Container>
        <Navbar.Brand ><Link to={'/'} style={{textDecoration:"none", fontSize:"30px", color:"yellow"}}>
        <i className="fa-solid fa-truck-fast"></i>E-Cart</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        { insideHome&&<Form.Control 
          type="text"
          placeholder="Search"
          className="ms-5 w-25" 
          onChange={e=>dispatch(searchProducts(e.target.value.toLowerCase()))}
        />}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            
                <Link to={'/wishlist'} style={{color:"black", fontWeight:"bold", textDecoration:"none"}}>
                <i className="fa-solid fa-heart text-danger"></i>Wishlist<Badge bg="success" 
                className= "rounded ms-2">{wishlistCount}</Badge></Link>
            
            
                <Link to={'/cart'} style={{color:"black", fontWeight:"bold", textDecoration:"none"}}>
                <i className="fa-solid fa-cart-shopping text-warning"></i> Cart <Badge bg="success" 
                className=" rounded ms-2">{cartCount}</Badge></Link>
           
            
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      
    </>
  )
}

export default Header
