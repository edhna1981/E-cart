import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../Components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, emptyCart, increment, removeCart } from '../Redux/slice/cartSlice'
import Swal from 'sweetalert2'


function Cart() {
  const cart = useSelector(state => state.cartReducer)
  const [total, setTotal] = useState(0)
  const dispatch = useDispatch()
  const navigate=useNavigate()

  useEffect(() => {
    if (cart.length > 0) {
      setTotal(cart.map(product => product.totalPrice).reduce((p1, p2) => p1 + p2))
    } else {
      setTotal(0)
    }
  }, [cart])

  const checkOut = () => {
    setTimeout(() => {
        Swal.fire({
          title: "Order Placed..,Thank you for Purchasing",
          icon: "success",
          draggable: true
        });
        navigate('/')
        dispatch(emptyCart())

      }, 1000)
    }
  
return (
    <div>
      <Header />

      <div style={{ marginTop: "100px" }}>
        {
          cart.length > 0 ? (
            <div className='container-fluid row w-100'>
              <div className='col-lg-1'></div>
              <div className='col-lg-6'>
                <div className='card rounded mt-2'>
                  <table className='mt-2'>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Image</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((product, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{product.title}</td>
                          <td><img src={product.thumbnail} alt="" /></td>
                          <td><button className='btn text-danger fw-bolder' onClick={() => dispatch(decrement(product.id))}>-</button><input
                            className='text-center' type="text" value={product.quantity} readOnly style={{ width: "25%" }} />
                            <button className='btn text-success fw-bolder' onClick={() => dispatch(increment(product.id))}>+</button></td>
                          <td className='text-danger'>{product.totalPrice}</td>
                          <td><button className='btn' onClick={() => dispatch(removeCart(product.id))}><i className='fa-solid fa-trash text-danger'></i></button></td>
                        </tr>

                      ))}

                    </tbody>
                  </table>
                  <div className='d-flex justify-content-between mt-2'>
                    <button className='btn btn-danger' onClick={() => dispatch(emptyCart())}>Empty Cart</button>
                    <Link to={'/'} className='btn btn-warning'>Shop More</Link>
                  </div>
                </div>

              </div>
              <div className='col-lg-4'>
                <div className='card shadow p-5'>
                  <h1>Cart Summary</h1>
                  <h2>Total Products: <span>{cart.length}</span></h2>
                  <h3>Total Price: <span className='text-danger'>{total}</span></h3>
                </div>
                <div className='d-grid m-2'>
                  <button className='btn btn-success rounded' onClick={checkOut}>Checkout</button>
                </div>

              </div>
              <div className='col-lg-1'></div>
            </div>


          ) : <div className='text-center'>
            <img src="https://cdn.dribbble.com/users/642104/screenshots/6269396/cart_drbl.gif" alt="" />
            <h1 className='text-danger mt-5'>Your Cart is Empty...</h1>
          </div>
        }

      </div>

    </div>
  )
}

export default Cart
