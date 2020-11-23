import React, { Component } from 'react'

export default class Doctor extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.doctor.id}</td>
                <td>{this.props.doctor.nombre}</td>
                <td>{this.props.doctor.rfc}</td>
                <td className="botones">
                    <button className="btn-editar"value={this.props.doctor.id}>Editar</button>
                    <button className="btn-eliminar"value={this.props.doctor.id}>Eliminar</button>
                </td>
            </tr>
        )
    }
}
