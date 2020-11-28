import React, { Component } from 'react'
import './FormInventario.css'
import { Link } from 'react-router-dom';

export default class FormInventario extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cantidad: this.props.inv.cantidad,
        }
    }

    handlendCantidad = (e) => {
        this.setState({ cantidad: e.target.value })
    }
    


    editarCantidad = () => {
        fetch(`http://localhost:3000/FRF/inventario/${this.props.inv._id}`, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: 'put',
            body: JSON.stringify({
                cantidad: this.state.cantidad
            })

        }).then(response => response.json())
            .then()
            .catch(err => console.log(err))
    }


   
    

    render() {
        return (
            <div className="width-inventario">
                <form>

                    <div className="segmento-inventario">

                        <label className="labele">Nombre Del Producto: </label>

                        <input disabled name="nombre" value={this.props.inv.nombre} type="text"></input>
                        <h3 className="error-nombre">Error</h3>
                    </div>

                    <div className="segmento-inventario">
                        <label className="labele">Cantidad:</label>
                        <input /*defaultValue={this.props.inv.cantidad}*/ value={this.state.cantidad}  id="cantidad" type="text" onChange={this.handlendCantidad}   ></input>
                        <h3 className="error-cantidad">Error</h3>
                    </div>
                    <Link className="btn-editarInventario" to="/inventario" onClick={this.editarCantidad} value="Agregar">Aceptar</Link>
                </form>
            </div>
        )
    }
}
