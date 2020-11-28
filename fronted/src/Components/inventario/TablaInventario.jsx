import React, { Component } from 'react'
import Inventario from './Inventario'
import FormInventario from './FormInventario'
import './TablaInventario.css'
import { Link } from 'react-router-dom';

export default class TablaInventario extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inventario: [],
            seleccion: "",
            inv: {
                _id: "",
                nombre: "",
                cantidad: ""
            },
            mia: "",
        }
    }



    cambiarSeleccion = (e) => {
        this.setState({ seleccion: e.target.value })
        this.state.inventario.map(inve => {
            inve._id == e.target.value ? this.setState({
                inv: {
                    _id: inve._id,
                    nombre: inve.idProducto.nombre,
                    cantidad: inve.cantidad
                }
            }) : console.log("niaa")
        })

    }

   

    cargarInventario = () => {
        fetch(`http://localhost:3000/FRF/inventario`, {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),

        }).then(response => response.json())
            .then(data => {
                this.setState({ inventario: data })
            }).catch(err => console.log(err))
    }

    editar = () => {
        this.props.loadInv(this.state.inv)
    }

    componentWillMount() {
        this.cargarInventario()
    }

    hand = (e) => {
        this.setState({ mia: e.target.value })
        console.log(this.state.mia)
    }
    editarCantidad = () => {

        this.actualizarTabla()
        fetch(`http://localhost:3000/FRF/inventario/${this.state.inv._id}`, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: 'put',
            body: JSON.stringify({
                cantidad: this.state.mia
            })

        }).then(response => response.json())
            .then()
            .catch(err => console.log(err))
    }

    actualizarTabla = () => {

        const listaNueva= this.state.inventario.filter(inv=>  inv._id == this.state.seleccion ? inv.cantidad=this.state.mia : inv) 

        this.setState({ inventario: listaNueva})
        this.setState({seleccion: ""})
    }

    render() {
        return (
            <div>
                <div className="segmento-inventario">
                    <h1 className="titulo-inventario">Tabla Inventario</h1>
                    <div className="scroll-inventario">
                        <table>
                            <thead>
                                <tr>
                                    <th>nombre</th>
                                    <th>clasificacion</th>
                                    <th>Cantidad</th>
                                    <th>Controlador</th>
                                </tr>
                            </thead>
                            <tbody>

                                {this.state.inventario.map(inventario =>
                                    <Inventario key={inventario._id} cambiarSeleccion={this.cambiarSeleccion} inventario={inventario}></Inventario>)}
                            </tbody>
                        </table>

                    </div>
                    <div className="boto">
                        <Link className="btn-editarInventario" onClick={this.editar} to="/inventarioEditar">Editar</Link>
                    </div>
                </div>

                <div className="modal">
                    <div className="width-inventario">
                        <form>

                            <div className="segmento-inventario">

                                <label className="labele">Nombre Del Producto: </label>

                                <input disabled name="nombre" value={this.state.inv.nombre} type="text"></input>
                                <h3 className="error-nombre">Error</h3>
                            </div>

                            <div className="segmento-inventario">
                                <label className="labele">Cantidad:</label>
                                <input defaultValue={this.state.inv.cantidad}  id="cantidad" type="text" onChange={this.hand}   ></input>
                                <h3 className="error-cantidad">Error</h3>
                            </div>
                            <Link className="btn-editarInventario" to="/inventario" onClick={this.editarCantidad} value="Agregar">Aceptar</Link>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}
