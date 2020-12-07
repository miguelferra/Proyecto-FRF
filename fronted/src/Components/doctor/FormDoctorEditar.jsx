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
    

    componentDidMount(){
        document.getElementById("label-nombre").style.marginTop = "-35px"
        document.getElementById("label-cedula").style.marginTop = "-35px"
        
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
            .then(document.getElementsByClassName("confirmacionDoctor")[0].style.display="flex")
            .catch(err => console.log(err))


    }

    ventanaConfirmacion=()=>{
       if(this.validarNombre()===false || this.validarCedula()===false){
           return false
       }

       this.editarDoctor();
    }

    validarNombre=()=>{
        const expNombre= RegExp(/^[0-9a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,-]{1,35}$/)
        const nombretrim = this.state.nombre.trim().replace(/\s\s+/g, ' ')
    
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
        const cedulatrim = this.state.cedula.trim().replace(/\s\s+/g, ' ')
    
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

            <h1 className="titulo-doctorAgregar">Editar Doctor</h1>

            <form>
                <div className="segmento-doctor">
                <input name="nombre" id="nombre" value={this.state.nombre} onChange={this.handlendNombre} type="text"></input>
                    <label id="label-nombre">Nombre Del Doctor</label>
                   
                    
                <span id="error-nombre-doctor">*Campo incorrecto</span>
                </div>

                <div className="segmento-doctor">
                <input  name="cedula" id="cedula" value={this.state.cedula} onChange={this.handlendCedula} type="text"></input>
                    <label id="label-cedula">Cedula</label>

                
                <span id="error-cedula-doctor">*Campo incorrecto</span>
                </div>

                <input className="btn-agregar" onClick={this.ventanaConfirmacion} type="button" value="Editar"></input>
            </form>

            <div className="confirmacionDoctor">
                <h2>Se editó un doctor</h2>
                <Link to="/doctor" onClick={()=> document.getElementsByClassName("confirmacionDoctor")[0].style.display="none"} className="btn-aceptarDoctor">Aceptar</Link>
            </div>
        </div>
        </div>

           
        )
    }
}
