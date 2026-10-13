import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import Header from '../Components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { removeWishlist } from '../Redux/slice/wishlistSlice'
import { addToCart } from '../Redux/slice/cartSlice'




function Wishlist() {
  const dispatch=useDispatch()

  const{wishlist}=useSelector(state=>state.wishlistReducer)

  const handleCart=(product)=>{
    dispatch(addToCart(product))
    dispatch(removeWishlist(product.id))
  }
  
  return (
    <>
    <Header />
    <div style={{marginTop:"100px"}} className='container-fluid'>
      <Row>
        {wishlist.length>0?wishlist.map(product=>(
          <Col className='m-3'>
        <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={product.thumbnail} />
      <Card.Body>
        <Card.Title className='text-warning'>{product.title.slice(0,10)}...</Card.Title>
        <Card.Text>
           { product.description.slice(0,40)}...
        </Card.Text>
        <div className='d-flex justify-content-between'>
            <Button className='btn btn-light' onClick={()=>dispatch(removeWishlist(product.id))} ><i className="fa-solid fa-trash text-danger"></i></Button>
            <Button className='btn btn-light' onClick={()=>dispatch(handleCart(product))}><i className="fa-solid fa-cart-shopping text-info"></i></Button>
        </div>
      </Card.Body>
    </Card>
       </Col>

      )):<div className='text-center'>
          <img src="https://cdn.dribbble.com/users/642104/screenshots/6269396/cart_drbl.gif" alt="" />
          <h1 className='text-danger mt-5'>Your Wishlist is Empty...</h1>
          </div>}
        
      </Row>

    </div>
      
    </>
  )
}

export default Wishlist
