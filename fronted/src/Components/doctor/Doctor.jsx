import React, { Component } from 'react'

export default class Doctor extends Component {

    render() {
        return (
            <tr>
               
                <td>{this.props.doctor.nombre}</td>
                <td>{this.props.doctor.cedula}</td>
                <td className="radio">
                  <input onChange={this.props.cargarSeleccion} type="radio" value={this.props.doctor._id} name="radio"></input>
                </td>
            </tr>
        )
    }
}
