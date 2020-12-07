import React, { Component } from 'react'
import './FormInventario.css'
import { Link } from 'react-router-dom';

export default class FormInventario extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cantidad: this.props.inv.cantidad,
        }
    }

    handlendCantidad = (e) => {
        this.setState({ cantidad: e.target.value })
    }
    


    editarCantidad = () => {
        fetch(`http://localhost:3000/FRF/inventario/${this.props.inv._id}`, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: 'put',
            body: JSON.stringify({
                cantidad: this.state.cantidad
            })

        }).then(response => response.json())
            .then()
            .catch(err => console.log(err))
    }

    ventanaConfirmacion=()=>{
        
        
        if(this.validarCantidad()===false){
            return false
        }

        this.editarCantidad()
        document.getElementsByClassName("confirmacion-inventario")[0].style.display="flex"
        document.getElementsByClassName("form-inventario")[0].style.opacity="0.5"
    }


    validarCantidad=()=>{
        const expCantidad= RegExp(/^\d{1,3}$/)
        const cantidadtrim = this.state.cantidad
        console.log(cantidadtrim)
    
        if(cantidadtrim === "" ||  !expCantidad.test(cantidadtrim)){
            document.getElementById("error-cantidad-inventario").style.display="flex"
            document.getElementById("cantidad").style.border = "1px solid red"
            return false
        }
        else{
            document.getElementById("error-cantidad-inventario").style.display="none"
            document.getElementById("cantidad").style.border = "1px solid black"
            return true
        }
    }


   
    

    render() {
        return (

            <div className="centro">

            
            <div className="cuadricula">
                <h1 className="titulo-agregar">Editar inventario</h1>
                <form className="form-inventario">

                    <div className="segmento-inventario">
                        <label>Nombre Del Producto </label>
                        <input readOnly disabled name="nombre" value={this.props.inv.nombre} type="text"></input>
                        

                        
                    </div>

                    <div className="segmento-inventario">
                        <label>Cantidad</label>
                        <input /*defaultValue={this.props.inv.cantidad}*/ value={this.state.cantidad}  id="cantidad" type="number" onChange={this.handlendCantidad}   ></input>
                        <span id="error-cantidad-inventario">Campo incorrecto</span>
                    </div>
                    <input readOnly className="btn-editarInventario" to="inventario" onClick={this.ventanaConfirmacion} value="Editar"></input>
                </form>

                <div>
                <div className="confirmacion-inventario">
                    <h2>Se editó el inventario</h2>
                    <Link to="inventario" onClick={()=>document.getElementsByClassName("confirmacion-inventario")[0].style.display="none"} className="btn-aceptarProducto">Aceptar</Link>
                </div>
                </div>
            </div>
            </div>
        )
    }
}
