import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import MainFooter from './common/MainFooter'
import MainHeader from './common/MainHeader'
import MainNav from './common/MainNav'
import Start from './pages/Start'
import Investments from './pages/Investments'
import Suppliers from './pages/Suppliers'
import Employees from './pages/Employees'
import Store from './pages/Store'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'

function App() {
  return (
    <>
      <BrowserRouter>
        <MainHeader />
        <MainNav />

        <main id="main-content">
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/inversiones" element={<Investments />} />
            <Route path="/proveedores" element={<Suppliers />} />
            <Route path="/empleados" element={<Employees />} />
            <Route path="/tienda" element={<Store />} />
            <Route path="/productodetalle/:idproducto" element={<ProductDetails />} />
            <Route path="/carrito" element={<Cart />} />
          </Routes>     
        </main>
        
        <MainFooter />
      </BrowserRouter>
    </>
  )
}

export default App