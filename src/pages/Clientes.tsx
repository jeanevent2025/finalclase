import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { API_URL } from "../utils";
import { Cliente } from "../types/Cliente";


function Clientes() {
    const [listaClientes, setListaClientes] = useState<Cliente[]>([]);
    const [filasPagina, setFilasPagina] = useState(20)
    const [numeropPagina, setNumeroPagina] = useState(1)
    const [totalFilas, setTotalFilas] = useState(0)
    const [totalPaginas, setTotalPaginas] = useState(0)

    useEffect(() => {
        leerServicio();
    }, [numeropPagina, filasPagina]);

    const leerServicio = () => {
        fetch(`${API_URL}clientes_paginacion.php?filas_pagina=${filasPagina}&numero_pagina=${numeropPagina}`)
            .then(response => response.json())
            .then((data: { total: number, clientes: Cliente[] }) => {
                console.log(data.total);
                setTotalFilas(data.total)
                setListaClientes(data.clientes);
                const tPaginas = Math.ceil(data.total / filasPagina)
                setTotalPaginas(tPaginas)
            })
            .catch((error) => {
                console.error("Error consultando datos:", error);
            });
    }

    const retroceder = () => {
        if (numeropPagina > 1)
            setNumeroPagina(numeropPagina - 1)
    }
    const avanzar = () => {
        if (numeropPagina < totalPaginas) {
            setNumeroPagina(numeropPagina + 1)
        }
    }

    const dibujarNumerosPagina = () => {
        return (
            <>
                {
                    Array.from({ length: totalPaginas }, (_, index) => {
                        return (
                            <li key={index} className={`page-item ${index + 1 === numeropPagina ? "active" : ""}`}>
                                <a className="page-link" href="#"
                                    onClick={() => {
                                        setNumeroPagina(index + 1)
                                    }}>{index + 1}</a></li>


                        )
                    })
                }
            </>
        )
    }


    const dibujarPaginacion = () => {
        return (<nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className={`page-item ${numeropPagina === 1 ? "disabled" : ""}`}><a className="page-link" href="#"
                    onClick={() => retroceder()}>Anterior</a></li>
                {dibujarNumerosPagina()}

                <li className={`page-item ${numeropPagina === totalPaginas ? "disabled" : ""}`}><a className="page-link" href="#"
                    onClick={() => avanzar()}>Siguiente</a></li>
            </ul>
        </nav>)
    }

    const dibujarTabla = () => {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Empresa</th>
                        <th>Contacto</th>
                        <th>Cargo</th>
                        <th>Ciudad</th>
                        <th>País</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listaClientes.map(item =>
                            <tr key={item.idcliente}>
                                <td>{item.idcliente}</td>
                                <td>{item.empresa}</td>
                                <td>{item.nombres}</td>
                                <td>{item.cargo}</td>
                                <td>{item.ciudad}</td>
                                <td>{item.pais}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        )
    }

    const asignarFilasPaginar = () => {
        return (
            <select className="form-select w-auto d-inline ms-2"
                value={filasPagina}
                onChange={(event) => { 
                    setFilasPagina(Number(event.target.value))
                    setNumeroPagina(1)
                }}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
            </select>
        )
    }

    return (
        <>
            <PageHeader pageTitle="Clientes" />
            <section id="Clientes" className='padded'>
                <div className="container">
                    <div className="d-flex justify-content-between">
                        {dibujarPaginacion()}
                        <div>Numero de filas
                            {asignarFilasPaginar()}
                        </div>
                    </div>
                    {dibujarTabla()}
                    {"Total de filas: " + totalFilas}
                </div>
            </section>
        </>
    )
}

export default Clientes