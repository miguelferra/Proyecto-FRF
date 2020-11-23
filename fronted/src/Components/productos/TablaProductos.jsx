import React, { Component } from 'react'
import Producto from './Producto'
import './TablaProductos.css'


export default class TablaProductos extends Component {

    constructor(props){
        super(props);
        this.state={
            productos: this.props.productos
        }
    }
    render() {
        return (
            <div className="scroll">
                <table >
                    <thead>
                        <th>id</th>
                        <th>nombre</th>
                        <th>clasificacion</th>
                        <th>Precio</th>
                        <th>Controlador</th>
                    </thead>

                    {this.state.productos.map(producto => 
                        <Producto producto ={producto}></Producto>)}

                </table>
            </div>
        )
    }
}
