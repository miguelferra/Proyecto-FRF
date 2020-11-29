import React, { Component } from 'react'
import './FormDoctor.css'
import {Link} from 'react-router-dom';

export default class FormDoctorEditar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productos: this.props.productos,
                _id: this.props.doctor._id,
                nombre: this.props.doctor.nombre,
                cedula: this.props.doctor.cedula,
        }

        console.log(this.props)
        
       
    }

    handlendNombre = (e) => {
        this.setState({
                nombre: e.target.value
            })
    }
    handlendCedula = (e) => {
        this.setState({
                cedula: e.target.value
            })
    }
    

    

    editarDoctor = () => {
        
        document.getElementsByClassName("confirmacionDoctor")[0].style.display="flex"

      

        fetch(`http://localhost:3000/FRF/doctores/${this.state._id}`, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: 'put',
            body: JSON.stringify({
                nombre: this.state.nombre /*this.state.form.nombre.trim().replace(/\s\s+/g, ' ')*/,
                cedula: this.state.cedula,
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
                   
                    <input name="nombre" value={this.state.nombre} onChange={this.handlendNombre} type="text"></input>
                <h3 className="error-nombre">Error</h3>
                </div>

                <div className="segmento-doctor">
                    <label>Cedula</label>

                <input  name="cedula" value={this.state.cedula} onChange={this.handlendCedula} type="text"></input>
                <h3 className="error-cantidad">Error</h3>
                </div>

                <input className="btn-agregar" onClick={this.editarDoctor} type="button" value="Agregar"></input>
            </form>

            <div className="confirmacionDoctor">
                <h2>Se agregó un pruducto</h2>
                <Link to="/doctor" onClick={this.confirmacion} className="btn-aceptarDoctor">Aceptar</Link>
            </div>
        </div>

           
        )
    }
}
