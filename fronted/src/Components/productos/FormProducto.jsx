import React, { Component } from 'react'
import './FormProducto.css'

import {Link} from 'react-router-dom';

export default class FormProducto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productos: this.props.productos,
            nuevoProducto: {
                nombre: "",
                clasificacion: "",
                precio: ""
            },
           
        }
        
       
    }

    handlendChange = (e) => {
        this.setState({
            nuevoProducto: {
                ...this.state.nuevoProducto,
                [e.target.name]: e.target.value
            }
        })

    }

    componentDidUpdate(){
        this.state.nuevoProducto.nombre.length>0 ?  document.getElementById("label-nombre").style.marginTop = "-35px":document.getElementById("label-nombre").style.marginTop = "0px"
        this.state.nuevoProducto.precio.length>0 ?  document.getElementById("label-precio").style.marginTop = "-35px":document.getElementById("label-precio").style.marginTop = "0px"
        
    }

    

    agregar = () => {
        
        
        fetch(`http://localhost:3000/FRF/productos`, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: 'post',
            body: JSON.stringify({
                nombre: this.state.nuevoProducto.nombre.trim().replace(/\s\s+/g, ' '),
                clasificacion: this.state.nuevoProducto.clasificacion,
                precio: this.state.nuevoProducto.precio.trim().replace(/\s\s+/g, ' ')
            })

        }).then(response => response.json())
            .then()
            .catch(err => console.log(err))
    }

    ventanaConfirmacion=()=>{
        this.validarNombre()
        this.validarClasificacion()
        this.validarPrecio()

        if(this.validarNombre()===false || this.validarClasificacion()===false || this.validarPrecio()===false){
            return false;
        }

        this.agregar();

        document.getElementsByClassName("confirmacionProducto")[0].style.display="flex"
    }


    validarNombre=()=>{
        const expNombre= RegExp(/^[0-9a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,-]{1,35}$/)
        const nombretrim = this.state.nuevoProducto.nombre.trim().replace(/\s\s+/g, ' ')
    
        if(nombretrim === "" || !expNombre.test(nombretrim)){
            document.getElementById("nombre").style.border = "1px solid red"
            document.getElementById("error-nombre-producto").style.display="flex"
            return false
        }
        else{
            document.getElementById("error-nombre-producto").style.display="none"
            document.getElementById("nombre").style.border = "1px solid black"
            return true
        }
    }

    validarClasificacion=()=>{
        const clas = this.state.nuevoProducto.clasificacion
        if (clas === "" || clas==="Seleccione una clasificación" || clas===undefined){
            document.getElementById("error-clasificacion-producto").style.display="flex"
            console.log(clas);
            return false
        }
        else{
            document.getElementById("error-clasificacion-producto").style.display="none"
            return true
        }
    }

    validarPrecio=()=>{
        const expPrecio= RegExp(/^\d{1,3}(,\d{3})*(\.\d+)?$/)
        const preciotrim = this.state.nuevoProducto.precio.trim().replace(/\s\s+/g, ' ')
    
        if(preciotrim === "" ||  !expPrecio.test(preciotrim)){
            document.getElementById("error-precio-producto").style.display="flex"
            document.getElementById("precio").style.border = "1px solid red"
            return false
        }
        else{
            document.getElementById("error-precio-producto").style.display="none"
            document.getElementById("precio").style.border = "1px solid black"
            return true
        }
    }


    render() {
        return (

            

            <div className="centro">

            
            <div className="cuadricula">
                <h1 className="titulo-agregar">Agregar un producto</h1>


                <div className="width-producto">


                    <form className="form-producto">

                        <div className="segmento-producto">

                        <input  name="nombre" id="nombre" onChange={this.handlendChange} type="text"></input>    
                        <label id ="label-nombre">Nombre Del Producto</label>

                            
                            <span id="error-nombre-producto">*Campo incorrecto</span>
                        </div>


                        <div className="segmento-producto">

                           

                            <select onChange={this.handlendChange} className="select-producto" name="clasificacion">
                                <option>Seleccione una clasificación</option>
                                <option>Dulce</option>
                                <option>Pastillas</option>
                                <option>Otros</option>
                            </select>
                            <span id="error-clasificacion-producto">*Eliga una opción valida</span>
                        </div>


                        <div className="segmento-producto">
                        <input  name="precio" id="precio" onChange={this.handlendChange} type="number"></input>
                            <label id="label-precio">Precio</label>

                            
                            <span id="error-precio-producto">*Campo incorrecto</span>
                        </div>
                        <input className="btn-agregar-producto" onClick={this.ventanaConfirmacion} type="button" value="Agregar"></input>
                    </form>
                </div>

                <div className="confirmacionProducto">
                    <h2>Se agregó un pruducto</h2>
                    <Link to="producto" onClick={()=>document.getElementsByClassName("confirmacionProducto")[0].style.display="none"} className="btn-aceptarProducto">Aceptar</Link>
                </div>


            </div>
            </div>
           
        )
    }
}
