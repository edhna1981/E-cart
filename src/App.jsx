
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './Components/Footer'

import Cart from './Pages/Cart'
import Home from './Pages/Home'
import Wishlist from './Pages/Wishlist'
import View from './Pages/View'



function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/wishlist' element={<Wishlist/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/view/:id' element={<View/>}/>
      {/* requesting an invalid url to redirect to Home */}
      <Route path='/*' element={<Navigate to={'/'}/>}/>
    </Routes>
    <Footer/>
      
    </>
  )
}

export default App
