import React, { Component } from 'react'
import './FormProducto.css'

export default class FormProducto extends Component {
    constructor(props){
        super(props);
        this.state = {
            productos: this.props.productos,
            nuevoProducto:{
                id: this.props.productos.length,
                nombre: "",
                clasificacion: "",
                precio: ""
            }
        }
    }

    handlendChange =(e)=>{
        this.setState({nuevoProducto:{
        ...this.state.nuevoProducto,
        [e.target.name]: e.target.value}})

    
    }

    agregar=()=>{
        const id = this.state.productos.length.toString();
        
        console.log("Producto", this.state.nuevoProducto)
    
    }

    render() {
        return (
            <div className="width">
                <form>
                    <div className="segmento">
                        <div className="labelito">
                        <label>ID:</label>
                        </div>
                    <input name="id" disabled type="text"></input>
                    
                    
                    </div>
                
                    <div className="segmento">
                    <div className="labelito">
                        <label>Nombre Del Producto:</label>
                        </div>
                    <input name="nombre" onChange={this.handlendChange} type="text"></input>
                    <h3 className="error-nombre">Error</h3>
                    </div>


                    <div className="segmento">
                    <div className="labelito">
                        <label>Clasificación:</label>
                        </div>
                    <select name="tipos">
                        <option>Seleccione una clasificaciónn</option>
                        <option>Dulce</option>
                        <option>Pastillas</option>
                        <option>Otros</option>
                    </select>
                    
                    <h3 className="error-clasificacion">Error</h3>
                    </div>


                    <div className="segmento">
                    <div className="labelito">
                        <label>Precio:</label>
                        </div>
                    <input  name="precio" onChange={this.handlendChange} type="text"></input>
                    <h3 className="error-precio">Error</h3>
                    </div>

                    <input className="btn-agregar" onClick={this.agregar} type="button" value="Agregar"></input>
                    
                   
                </form>
            </div>
        )
    }
}
