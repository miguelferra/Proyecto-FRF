import React, { Component } from 'react'

export default class Inventario extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.inventario.idProducto.nombre}</td>
                <td>{this.props.inventario.idProducto.clasificacion}</td>
                <td>{this.props.inventario.cantidad}</td>
                <td className="radio-producto">
                    <input onChange={this.props.cambiarSeleccion} type="radio" name="radio" className="btn-editar" value={this.props.inventario._id}></input>
                </td>
            </tr>
        )
    }
}
