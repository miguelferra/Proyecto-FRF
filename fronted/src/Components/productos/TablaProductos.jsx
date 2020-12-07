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
        this.actualizarTabla();
        fetch(`http://localhost:3000/FRF/productos/${this.state.seleccion}`, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: 'delete',
        }).then(response => response.json())
            .then(
                document.getElementsByClassName("confirmar-eliminar")[0].style.display="none"
            )
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
    }

    ventanaEliminar=()=>{
        document.getElementsByClassName("confirmar-eliminar")[0].style.display="block"
    }



    render() {
        return (
            <div>
                <h1 className="tituloProducto">Productos</h1>
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
                <a onClick={this.ventanaEliminar}  className="btn-eliminarProducto"  >Eliminar</a>
        
            </div>

            <div className="confirmar-eliminar"> 
                    <h4>¿Estás seguro que quieres eliminar?</h4>
                    <div className="botones">
                        <button className="btn-agregarProducto" onClick={this.eliminarProducto}>Aceptar</button>
                        <button className="btn-eliminarProducto"onClick={()=>document.getElementsByClassName("confirmar-eliminar")[0].style.display="none"} >Cancelar</button>
                    </div>
                    

            </div>


        

            </div>
        )
    }
}
