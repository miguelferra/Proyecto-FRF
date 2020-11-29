import React, { Component } from 'react'
import Producto from './Producto'
import './TablaProductos.css'
import './FormProducto.css'
import {Link} from 'react-router-dom';


export default class TablaProductos extends Component {

    constructor(props){
        super(props);
        this.state={
            productos: [],
            seleccion: "",
        }
    }



    eliminarProducto=()=>{
        this.actualizarTabla()
        fetch(`http://localhost:3000/FRF/productos/${this.state.seleccion}`, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: 'delete',
        }).then(response => response.json())
            .then()
            .catch(err => console.log(err))
    }



    actualizarTabla = () => {
        this.setState({ productos: this.state.productos.filter(pro => pro._id != this.state.seleccion) })
        this.setState({seleccion: ""})
    }

    cambiarSeleccion=(e)=>{
        this.setState({seleccion: e.target.value})
    }    

    componentWillMount(){
        this.cargarProductos()
        
    }
    cargarProductos=()=>{
        fetch(`http://localhost:3000/FRF/productos`, {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
           
        }).then(response => response.json())
            .then(data => {
                this.setState({productos: data})
            }).catch(err => console.log(err))
        }


    editarProducto=()=>{
        
        this.state.productos.map((pro)=>{
            if(pro._id==this.state.seleccion){
                this.props.loadPro(pro);
            }
        })

       // this.props.loadSeleccion(this.state.seleccion)
        

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
               
                <Link to="/productoAgregar" className="btn-agregarProducto" >Agregar</Link>
                <Link to="/productoEditar"  onClick={this.editarProducto} className="btn-editarProducto" >Editar</Link>
                <a onClick={this.eliminarProducto}  className="btn-eliminarProducto"  >Eliminar</a>
        
            </div>


        

            </div>
        )
    }
}
