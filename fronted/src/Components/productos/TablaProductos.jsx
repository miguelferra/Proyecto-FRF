import React, { Component } from 'react'
import Producto from './Producto'
import './TablaProductos.css'
import './FormProducto.css'


export default class TablaProductos extends Component {

    constructor(props){
        super(props);
        this.state={
            productos: this.props.productos,
            seleccion: ""
        }
        console.log(this.state.productos)
    
    }



    eliminarProducto=()=>{
        fetch(`http://localhost:3000/FRF/productos/${this.state.seleccion}`, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: 'put',
            

        }).then(response => response.json())
            .then()
            .catch(err => console.log(err))
    }


    cambiarSeleccion=(e)=>{
        this.setState({seleccion: e.target.value})
    }    
    render() {
        return (
            <div>
                <h1 className="tituloProducto">Tabla Productos</h1>
            <div className="scroll">
                <table >
                    <thead>
                        <tr>
                            <th>nombre</th>
                            <th>clasificacion</th>
                            <th>Precio</th>
                            <th>Controlador</th>
                        </tr>
                    </thead>
                    <tbody>

                    {this.state.productos.map(producto => 
                        <Producto cambiarSeleccion={this.cambiarSeleccion} key={producto._id} producto ={producto}></Producto>)}
                    </tbody>
                        
                        
                        

                </table>
            </div>
            <div className="botones">
               
                <a href="/productoAgregar" className="btn-agregarProducto" >Agregar</a>
                <a href="/productoEditar" className="btn-editarProducto" >Editar</a>
                <a onClick={this.eliminarProducto}  className="btn-eliminarProducto"  >Eliminar</a>
        
            </div>
            
        

            </div>
        )
    }
}
