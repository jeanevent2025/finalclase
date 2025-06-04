import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { Proveedor } from "../types/Proveedor";
import { API_URL } from "../utils";

function Suppliers() {
    const [listaProveedores, setListaProveedores] = useState<Proveedor[]>([]);

    useEffect(() => {
        leerServicio();
    }, []);

    const leerServicio = () => {
        fetch(API_URL + "proveedores.php")
            .then(response => response.json())
            .then((data: Proveedor[]) => {
                console.log(data);
                setListaProveedores(data);
            })
            .catch((error) => {
                console.error("Error consultando datos:", error);
            });
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
                        listaProveedores.map(item =>
                            <tr key={item.idproveedor}>
                                <td>{item.idproveedor}</td>
                                <td>{item.nombreempresa}</td>
                                <td>{item.nombrecontacto}</td>
                                <td>{item.cargocontacto}</td>
                                <td>{item.ciudad}</td>
                                <td>{item.pais}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        )
    }

    return (
        <>
            <PageHeader pageTitle="Proveedores" />
            <section id="suppliers" className='padded'>
                <div className="container">
                    {dibujarTabla()}
                </div>
            </section>
        </>
    )
}

export default Suppliers