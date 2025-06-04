import { ItemCarrito } from "../types/ItemCarrito"
import { Producto } from "../types/Producto"

export const API_URL = "https://servicios.campus.pe/"

export const agregarCarrito = (producto: Producto, cantidadProducto: number) => {
    const itemCarrito: ItemCarrito = {
        idproducto: producto.idproducto,
        nombre: producto.nombre,
        cantidad: cantidadProducto,
        precio: producto.preciorebajado == 0 ? producto.precio : producto.preciorebajado
    } 
    let carrito: ItemCarrito[] = sessionStorage.getItem("carritocompras") == null 
                                    ? [] 
                                    : JSON.parse(sessionStorage.getItem("carritocompras") || '[]')

    const index: number = carrito.findIndex(p => p.idproducto === itemCarrito.idproducto)

    if(index !== -1){
        carrito[index].cantidad += cantidadProducto
    }
    else{
        carrito.push(itemCarrito)
    } 
    
    sessionStorage.setItem("carritocompras", JSON.stringify(carrito))


}