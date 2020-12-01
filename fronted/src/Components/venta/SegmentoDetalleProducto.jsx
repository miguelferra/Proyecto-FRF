import React, { Component } from 'react'

export default class SegmentoDetalleProducto extends Component {
    render() {
        return (
            
                <tr>
                    <td>{this.props.det.nombre}</td>
                    <td>{this.props.det.cantidad}</td>
                    <td>{this.props.det.precio}</td>
                    <td>{this.props.det.precio*this.props.det.cantidad}</td>
                </tr>
           
        )
    }
}
