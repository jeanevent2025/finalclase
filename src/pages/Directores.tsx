import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { Director } from "../types/director";
import { API_URL } from "../utils";
import axios from "axios";

function Directores() {
    const [listaDirectores, setListaDirectores] = useState<Director[]>([]);
    const [iddirector, setIdDirector] = useState(0)
    const [nombres, setNombres] = useState("")
    const [peliculas, setPeliculas] = useState("")

    useEffect(() => {
        leerServicio();
    }, []);

    const leerServicio = async () => {
        try {
            const response = await fetch(API_URL + "directores.php")
            const data: Director[] = await response.json()
            console.log(data)
            setListaDirectores(data);

        }
        catch (error) {
            console.error("Error consultando datos:", error);
        };
        /*
        fetch(API_URL + "directores.php")
            .then(response => response.json())
            .then((data: Director[]) => {
                console.log(data);
                setListaDirectores(data);
            })
            .catch((error) => {
                console.error("Error consultando datos:", error);
            });
        */
    }

    const dibujarTabla = () => {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Director</th>
                        <th>Peliculas</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listaDirectores.map(item =>
                            <tr key={item.iddirector}>
                                <td>{item.iddirector}</td>
                                <td>{item.nombres}</td>
                                <td>{item.peliculas}</td>
                                <td><i className="bi bi-pencil" data-bs-toggle="offcanvas" data-bs-target="#offcanvasUpdate"
                                    onClick={() => seleccionarDirector(item)}></i></td>
                                <td><i className="bi bi-x-lg"></i></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        )
    }

    const seleccionarDirector = (director: Director) => {
        setIdDirector(director.iddirector)
        setNombres(director.nombres)
        setPeliculas(director.peliculas)
    }

    const insertDirector = async (event: React.SyntheticEvent) => {
        event.preventDefault()//Evita que se vuelva a cargar la pagina
        console.log(nombres, peliculas)

        const formData = new FormData()
        formData.append("nombres", nombres)
        formData.append("peliculas", peliculas)

        try {
            const response = await fetch(API_URL + "directoresinsert.php", {
                method: "POST",
                body: formData
            })
            const data: string = await response.text()
            console.log(data)

            leerServicio()
            const botonCerrar = document.querySelector("#offcanvasInsert .btn-close") as HTMLElement
            botonCerrar.click()
            setNombres("")
            setPeliculas("")

        }
        catch (error) {
            console.log("Error al registrar un nuevo director ", error)
        }
        /*
        fetch(API_URL + "directoresinsert.php", {
            method: "POST",
            body: formData
        })
            .then(response => response.text())
            .then((data: string) => {
                console.log(data)
                leerServicio()
                const botonCerrar = document.querySelector("#offcanvasInsert .btn-close") as HTMLElement
                botonCerrar.click()
                setNombres("")
                setPeliculas("")
            })
        */
    }


    const dibujarInsertModal = () => {
        return (
            <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasInsert" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasRightLabel">Nuevo Director</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <form onSubmit={(event) => insertDirector(event)}>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Nombre del director"
                                value={nombres} onChange={event => setNombres(event.target.value)} required minLength={4} />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="peliculas"
                                value={peliculas} onChange={event => setPeliculas(event.target.value)} required minLength={2} />
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-primary" type="submit">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    const updateDirector = async (event: React.SyntheticEvent) => {
        event.preventDefault()//Evita que se vuelva a cargar la pagina
        console.log(nombres, peliculas)

        const formData = new FormData()
        formData.append("iddirector", iddirector.toString())
        formData.append("nombres", nombres)
        formData.append("peliculas", peliculas)

        try {
            const response = await axios.post(API_URL + "directoresupdate.php", formData, {
                headers: {
                    'Content-Type': 'multipar/form-data'
                }
            })
            console.log(response)
            leerServicio()
            const botonCerrar = document.querySelector("#offcanvasUpdate .btn-close") as HTMLElement
            botonCerrar.click()
            setIdDirector(0)
            setNombres("")
            setPeliculas("")
        }
        catch (error) {
            console.log("Error al actualizar los datos del director ", error)
        }

        /*
        try{
        const response = await fetch(API_URL + "directoresupdate.php", {
            method: "POST",
            body: formData
        })
        const data: string = await response.text()
        console.log(data)
        leerServicio()
        const botonCerrar = document.querySelector("#offcanvasUpdate .btn-close") as HTMLElement
        botonCerrar.click()
        setIdDirector(0)
        setNombres("")
        setPeliculas("")
    }
        catch (error) {
            console.log("Error al actualizar los datos del director ", error)
        }
        */

        /*
        fetch(API_URL + "directoresupdate.php", {
            method: "POST",
            body: formData
        })
            .then(response => response.text())
            .then((data: string) => {
                console.log(data)
                leerServicio()
                const botonCerrar = document.querySelector("#offcanvasUpdate .btn-close") as HTMLElement
                botonCerrar.click()
                setIdDirector(0)
                setNombres("")
                setPeliculas("")
            })
        */

    }

    const dibujarUpdateModal = () => {
        return (
            <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasUpdate" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasRightLabel">Actualizar Director</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <form onSubmit={(event) => updateDirector(event)}>
                        <div className="mb-3">
                            <input type="text" className="form-control" readOnly
                                value={iddirector} />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Nombre del director"
                                value={nombres} onChange={event => setNombres(event.target.value)} required minLength={2} />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="peliculas"
                                value={peliculas} onChange={event => setPeliculas(event.target.value)} required minLength={2} />
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-primary" type="submit">Actualizar</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <>
            <PageHeader pageTitle="Directores" />
            <section id="directores" className='padded'>
                <div className="container">
                    <div className="mb-3">
                        <button className="btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#offcanvasInsert">
                            Nuevo director</button>

                        {dibujarTabla()}
                        {dibujarInsertModal()}
                        {dibujarUpdateModal()}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Directores