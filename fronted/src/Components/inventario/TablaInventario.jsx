import React, { Component } from 'react'
import Inventario from './Inventario'
import './TablaInventario.css'


export default class TablaInventario extends Component {
    render() {
        return (
            <div className="scroll">
                <table >
                    <thead>
                        <th>id</th>
                        <th>nombre</th>
                        <th>clasificacion</th>
                        <th>Cantidad</th>
                        <th>Controlador</th>
                    </thead>

                    {this.props.productos.map(producto => 
                        <Inventario producto ={producto}></Inventario>)}

                </table>
            </div>
        )
    }
}
