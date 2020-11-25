import React, { Component } from 'react'

export default class Producto extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.producto.nombre}</td>
                <td>{this.props.producto.clasificacion}</td>
                <td>{this.props.producto.precio}</td>
                <td className="botones">
                    <input onChange={this.props.cambiarSeleccion} value={this.props.producto._id} name="radi" type="radio"></input>
                </td>
            </tr>
        )
    }
}
