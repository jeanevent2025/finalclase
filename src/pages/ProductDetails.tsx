"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { API_URL, agregarCarrito } from "../utils"
import type { Producto } from "../types/Producto"
import "./ProductDetails.css"

function ProductDetails() {
  const params = useParams()
  console.log(params)
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto>()
  const [cantidad, setCantidad] = useState<number>(1)

  useEffect(() => {
    leerServicio()
  }, [])

  const leerServicio = async () => {
    try {
      const response = await fetch(API_URL + "productos.php?idproducto=" + params.idproducto)
      const data: Producto[] = await response.json()
      console.log(data)
      setProductoSeleccionado(data[0]) 
    } catch (error) {
      console.log("Error consultando datos:", error)
    }
  }

  const handleCantidadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    if (inputValue === "") return

    const valor = Number.parseInt(inputValue)
    if (!isNaN(valor)) {
      if (valor < 1) {
        setCantidad(1)
      } else if (valor > (productoSeleccionado?.unidadesenexistencia || 0)) {
        setCantidad(productoSeleccionado?.unidadesenexistencia || 1)
      } else {
        setCantidad(valor)
      }
    }
  }


  const handleAgregarCarrito = () => {
    if (productoSeleccionado) {
      agregarCarrito(productoSeleccionado, cantidad)
    }
  }

  const precioRebajado = Number(productoSeleccionado?.preciorebajado)
  const precio = Number(productoSeleccionado?.precio)

  return (
    <section className="padded">
      <div className="container">
        <div className="row">
          <div className="col">
            <img
              src={
                productoSeleccionado?.imagengrande
                  ? API_URL + productoSeleccionado.imagengrande
                  : API_URL + "imagenes/nofoto.jpg"
              }
              className="img-fluid"
              alt="..."
            />
          </div>
          <div className="col">
            <h2>{productoSeleccionado?.nombre}</h2>
            <table className="table">
              {productoSeleccionado && (
                <tbody>
                  <tr>
                    <th>Detalle</th>
                    <td>{productoSeleccionado?.detalle}</td>
                  </tr>
                  <tr>
                    <th>Categoría</th>
                    <td>{productoSeleccionado?.categoria}</td>
                  </tr>
                  <tr>
                    <th>Precio</th>
                    <td>
                      S/ {precioRebajado === 0 ? precio.toFixed(2) : precioRebajado.toFixed(2)}
                      <span className="precio-anterior">{precioRebajado === 0 ? "" : "S/ " + precio.toFixed(2)}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>Stock</th>
                    <td>{productoSeleccionado?.unidadesenexistencia}</td>
                  </tr>
                  <tr>
                    <th>Proveedor</th>
                    <td>{productoSeleccionado?.proveedor}</td>
                  </tr>
                  <tr>
                    <th>País</th>
                    <td>{productoSeleccionado?.pais}</td>
                  </tr>
                  <tr>
                    <th>Atención al cliente</th>
                    <td>{productoSeleccionado?.telefono}</td>
                  </tr>
                  <tr>
                    <th>valoracion</th>
                    <td>
                      {[...Array(5)].map((_, index) => (
                        <i
                          key={index}
                          className={`bi ${index < (productoSeleccionado?.promedioestrellas || 0) ? "bi-star-fill" : "bi-star"}`}
                        ></i>
                      ))}
                      <span className="ms-2">({productoSeleccionado?.totalcalificaciones}) Calificaciones</span>
                    </td>
                  </tr>
                </tbody>
              )}
            </table>

            {productoSeleccionado && (
              <div className="mb-4">
                <div className="row align-items-center">
                  <div className="col-auto">
                    <label htmlFor="cantidad" className="form-label fw-bold">
                      Cantidad:
                    </label>
                  </div>
                  <div className="col-auto">
                    <div className="input-group" style={{ width: "140px" }}>
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => cantidad > 1 && setCantidad(cantidad - 1)}
                      >
                        <i className="bi bi-dash"></i>
                      </button>
                      <input
                        type="number"
                        className="form-control text-center"
                        id="cantidad"
                        value={cantidad}
                        onChange={handleCantidadChange}
                        min="1"
                        max={productoSeleccionado.unidadesenexistencia}
                      />
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() =>
                          cantidad < productoSeleccionado.unidadesenexistencia && setCantidad(cantidad + 1)
                        }
                      >
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>
                  </div>
                  <div className="col-auto">
                    <button
                      className="btn btn-primary btn-lg"
                      onClick={handleAgregarCarrito}
                      disabled={productoSeleccionado.unidadesenexistencia === 0}
                    >
                      <i className="bi bi-cart-plus me-2"></i>
                      Agregar al Carrito
                    </button>
                  </div>
                </div>
                {productoSeleccionado.unidadesenexistencia === 0 && (
                  <div className="alert alert-warning mt-2">Producto sin stock disponible</div>
                )}
              </div>
            )}

            <h3>Descripción</h3>
            <div dangerouslySetInnerHTML={{ __html: productoSeleccionado?.descripcion || "" }}></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails
