import React, { Component } from 'react'
import './FormDoctor.css'

import {Link} from 'react-router-dom'

export default class FormDoctor extends Component {

    constructor(){
        super()
        this.state={
            nuevoDoctor: {
                nombre: "",
                cedula: ""
            }
        }
    }

    handlendChange=(e)=>{
        this.setState({nuevoDoctor: {
            ...this.state.nuevoDoctor,
            [e.target.name] : e.target.value
        }})

        console.log(this.state.nuevoDoctor)
    }

    componentDidUpdate(){
        this.state.nuevoDoctor.nombre.length>0 ?  document.getElementById("label-nombre").style.marginTop = "-35px":document.getElementById("label-nombre").style.marginTop = "0px"
        this.state.nuevoDoctor.cedula.length>0 ?  document.getElementById("label-cedula").style.marginTop = "-35px":document.getElementById("label-cedula").style.marginTop = "0px"
        
    }


    agregarDoctor=()=>{
        document.getElementsByClassName("confirmacionDoctor")[0].style.display="flex"
        fetch(`http://localhost:3000/FRF/doctores`, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: 'post',
            body: JSON.stringify({
                nombre: this.state.nuevoDoctor.nombre,
                cedula: this.state.nuevoDoctor.cedula
            })

        }).then(response => response.json())
            .then(document.getElementsByClassName("confirmacionDoctor")[0].style.display="flex")
            .catch(err => console.log(err))
    }


    ventanaConfirmacion=()=>{
        this.validarNombre()
        this.validarCedula()
        if(this.validarNombre()===false || this.validarCedula()===false){
            return false
        }

        this.agregarDoctor()
        
    }

    validarNombre=()=>{
        const expNombre= RegExp(/^[0-9a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,-]{1,35}$/)
        const nombretrim = this.state.nuevoDoctor.nombre.trim().replace(/\s\s+/g, ' ')
    
        if(nombretrim === "" || !expNombre.test(nombretrim)){
            document.getElementById("nombre").style.border = "1px solid red"
            document.getElementById("error-nombre-doctor").style.display="flex"
            return false
        }
        else{
            document.getElementById("error-nombre-doctor").style.display="none"
            document.getElementById("nombre").style.border = "1px solid black"
            return true
        }
    }

    validarCedula=()=>{
        const expCedula= RegExp(/^[0-9a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,-]{1,20}$/)
        const cedulatrim = this.state.nuevoDoctor.cedula.trim().replace(/\s\s+/g, ' ')
    
        if(cedulatrim === "" || !expCedula.test(cedulatrim)){
            document.getElementById("cedula").style.border = "1px solid red"
            document.getElementById("error-cedula-doctor").style.display="flex"
            return false
        }
        else{
            document.getElementById("error-cedula-doctor").style.display="none"
            document.getElementById("cedula").style.border = "1px solid black"
            return true
        }
    }


    render() {
        return (
            <div className="centro">

            
            <div className="cuadricula">

                <h1 className="titulo-doctorAgregar">Nuevo Doctor</h1>

                <form>
                    <div className="segmento-doctor">
                        <input name="nombre" id="nombre" onChange={this.handlendChange} type="text"></input>
                        <label id="label-nombre">Nombre Del Doctor</label>
                       
                        
                    <span id="error-nombre-doctor">*Campo incorrecto</span>
                    </div>

                    <div className="segmento-doctor">
                    <input  name="cedula" id="cedula" onChange={this.handlendChange} type="text"></input>
                        <label id="label-cedula">Cedula</label>

                    
                    <span id="error-cedula-doctor">*Campo incorrecto</span>
                    </div>

                    <input className="btn-agregar" onClick={this.ventanaConfirmacion} type="button" value="Agregar"></input>
                </form>

                <div className="confirmacionDoctor">
                    <h2>Se agregó un doctor</h2>
                    <Link to="/doctor" onClick={()=>document.getElementsByClassName("confirmacionDoctor")[0].style.display="none"} className="btn-aceptarDoctor">Aceptar</Link>
                </div>
            </div>
            </div>
        )
    }
}
