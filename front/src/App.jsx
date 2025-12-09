import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import Registry from './views/registry';
import Products from './views/products';
import Cart from './views/Cart';
import Admin from './views/Admin';
import DeleteGallery from './views/DeleteGallery';
import EditGallery from './views/EditGallery';
import EditarProducto from './views/EditarProducto';
import RutaProtegida from './components/rutaProtegida';
import NotFound from './views/NotFound';
import EliminarProducto from './views/EliminarProducto';



function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={
                                      <RutaProtegida isAuthenticated={isAuthenticated}>
                                        <Admin />
                                      </RutaProtegida>
                                    } />
        <Route path='/registry' element={<Registry />} />
        <Route path='/products/:id' element={<Products />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/edit' element={<EditGallery />} />
        <Route path='/edit/:id' element={<EditarProducto />} />
        <Route path='/delete' element={<DeleteGallery />} />
        <Route path='/delete/:id' element={<EliminarProducto />} />
        <Route path='*' element={<NotFound />} />
      </Routes> 
    </div>
  )
}

export default App