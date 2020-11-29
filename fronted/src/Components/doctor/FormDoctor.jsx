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
            .then()
            .catch(err => console.log(err))
    }


    confirmacion=()=>{
        document.getElementsByClassName("confirmacionDoctor")[0].style.display="none"
    }


    render() {
        return (
            <div className="width">

                <h1 className="titulo-doctorAgregar">Nuevo Doctor</h1>

                <form>
                    <div className="segmento-doctor">
                        <label>Nombre Del Doctor</label>
                       
                        <input name="nombre" onChange={this.handlendChange} type="text"></input>
                    <h3 className="error-nombre">Error</h3>
                    </div>

                    <div className="segmento-doctor">
                        <label>Cedula</label>

                    <input  name="cedula" onChange={this.handlendChange} type="text"></input>
                    <h3 className="error-cantidad">Error</h3>
                    </div>

                    <input className="btn-agregar" onClick={this.agregarDoctor} type="button" value="Agregar"></input>
                </form>

                <div className="confirmacionDoctor">
                    <h2>Se agregó un pruducto</h2>
                    <Link to="/doctor" onClick={this.confirmacion} className="btn-aceptarDoctor">Aceptar</Link>
                </div>
            </div>
        )
    }
}
