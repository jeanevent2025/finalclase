"use client"

import type React from "react"

import { useEffect, useState } from "react"
import type { Producto } from "../types/Producto"
import "./Productos.css"
import { agregarCarrito, API_URL } from "../utils"
import { Link } from "react-router-dom"

interface ProductosProps {
  codigoCategoria: number
}

function Productos({ codigoCategoria }: ProductosProps) {
  console.log(codigoCategoria)
  const [listaProductos, setListaProductos] = useState<Producto[]>([])
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto>()
  const [cantidadModal, setCantidadModal] = useState<number>(1)

  useEffect(() => {
    leerServicio(codigoCategoria)
  }, [codigoCategoria])

  const leerServicio = async (idcategoria: number) => {
    try {
      const response = await fetch(API_URL + "productos.php?idcategoria=" + idcategoria)
      const data: Producto[] = await response.json()
      console.log(data)
      setListaProductos(data)
    } catch (error) {
      console.log("Error consultando datos:", error)
    }
  }

  const dibujarCuadricula = () => {
    return (
      <div id="cards-productos" className="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 g-4">
        {listaProductos.map((item) => {
          const precioRebajado = Number(item.preciorebajado)
          const precio = Number(item.precio)
          return (
            <div className="col" key={item.idproducto}>
              <div className="card h-100">
                <Link to={"/productodetalle/" + item.idproducto}>
                  <img
                    src={item.imagenchica ? API_URL + item.imagenchica : API_URL + "imagenes/nofoto.jpg"}
                    className="card-img-top"
                    alt="..."
                  />
                </Link>
                <i
                  className="bi bi-eye icon-quick-view"
                  title="Vista rápida"
                  data-bs-toggle="modal"
                  data-bs-target="#quickViewModal"
                  onClick={() => seleccionarProducto(item.idproducto)}
                ></i>

                {precioRebajado !== 0 ? (
                  <div className="porcentaje-descuento">-{Math.round((1 - precioRebajado / precio) * 100) + "%"}</div>
                ) : (
                  ""
                )}
                <div className="card-body">
                  <h6 className="card-title">{item.nombre}</h6>
                  <p className="card-text">
                    S/ {precioRebajado === 0 ? precio.toFixed(2) : precioRebajado.toFixed(2)}
                    <span className="precio-anterior">{precioRebajado === 0 ? "" : "S/ " + precio.toFixed(2)}</span>{" "}
                    <i
                      className="bi bi-basket icon-cart"
                      title="Añadir al carrito"
                      onClick={() => agregarCarrito(item, 1)}
                    ></i>
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const seleccionarProducto = async (idproducto: number) => {
    console.log(idproducto)
   
    setCantidadModal(1)
    try {
      const response = await fetch(API_URL + "productos.php?idproducto=" + idproducto)
      const data: Producto[] = await response.json()
      console.log(data)
      setProductoSeleccionado(data[0]) 
    } catch (error) {
      console.log("Error consultando datos:", error)
    }
  }

 
  const handleCantidadModalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value

    if (inputValue === "") return

    const valor = Number.parseInt(inputValue)

    if (!isNaN(valor)) {
      if (valor < 1) {
        setCantidadModal(1)
      } else if (valor > (productoSeleccionado?.unidadesenexistencia || 0)) {
        setCantidadModal(productoSeleccionado?.unidadesenexistencia || 1)
      } else {
        setCantidadModal(valor)
      }
    }
  }


  const handleAgregarCarritoModal = () => {
    if (productoSeleccionado) {
      agregarCarrito(productoSeleccionado, cantidadModal)
      const modal = document.getElementById("quickViewModal")
      const modalInstance = (window as any).bootstrap?.Modal?.getInstance(modal)
      modalInstance?.hide()
    }
  }

  const showQuickView = () => {
    const precioRebajado = Number(productoSeleccionado?.preciorebajado)
    const precio = Number(productoSeleccionado?.precio)
    return (
      <div
        className="modal fade"
        id="quickViewModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title fs-5" id="exampleModalLabel">
                {productoSeleccionado?.nombre}
              </h3>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md">
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
                <div className="col-md">
                  <table className="table">
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
                          <span className="precio-anterior">
                            {precioRebajado === 0 ? "" : "S/ " + precio.toFixed(2)}
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <th>Stock</th>
                        <td>{productoSeleccionado?.unidadesenexistencia}</td>
                      </tr>
                    </tbody>
                  </table>


                  {productoSeleccionado && (
                    <div className="mb-3">
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <label htmlFor="cantidadModal" className="form-label fw-bold">
                            Cantidad:
                          </label>
                        </div>
                        <div className="col-auto">
                          <div className="input-group" style={{ width: "140px" }}>
                            <button
                              className="btn btn-outline-secondary"
                              type="button"
                              onClick={() => cantidadModal > 1 && setCantidadModal(cantidadModal - 1)}
                            >
                              <i className="bi bi-dash"></i>
                            </button>
                            <input
                              type="number"
                              className="form-control text-center"
                              id="cantidadModal"
                              value={cantidadModal}
                              onChange={handleCantidadModalChange}
                              min="1"
                              max={productoSeleccionado.unidadesenexistencia}
                            />
                            <button
                              className="btn btn-outline-secondary"
                              type="button"
                              onClick={() =>
                                cantidadModal < productoSeleccionado.unidadesenexistencia &&
                                setCantidadModal(cantidadModal + 1)
                              }
                            >
                              <i className="bi bi-plus"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      {productoSeleccionado.unidadesenexistencia === 0 && (
                        <div className="alert alert-warning mt-2">Producto sin stock disponible</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cerrar
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAgregarCarritoModal}
                disabled={!productoSeleccionado || productoSeleccionado.unidadesenexistencia === 0}
              >
                <i className="bi bi-cart-plus me-2"></i>
                Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {dibujarCuadricula()}
      {showQuickView()}
    </>
  )
}

export default Productos
