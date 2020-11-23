import React, { Component } from 'react'

export default class Producto extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.producto.id}</td>
                <td>{this.props.producto.nombre}</td>
                <td>{this.props.producto.clasificacion}</td>
                <td>{this.props.producto.precio}</td>
                <td className="botones">
                    <button className="btn-editar" value={this.props.producto.id}>Editar</button>
                    <button className="btn-eliminar"value={this.props.producto.id}>Eliminar</button>
                </td>
            </tr>
        )
    }
}
