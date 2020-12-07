import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Doctor from './Doctor'
import './TablaDoctor.css'


export default class TablaDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            doctores: [],
            seleccion: "",
        }
    }

    componentWillMount() {
        this.cargarDoctores()
    }

    cargarDoctores = () => {
        fetch(`http://localhost:3000/FRF/doctores`, {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),

        }).then(response => response.json())
            .then(data => {
                this.setState({ doctores: data })
            }).catch(err => console.log(err))
    }

    cargarSeleccion=(e)=>{
        this.setState({seleccion: e.target.value})
        console.log(e.target.value)
    }

    eliminarDoctor=()=>{
        this.actualizarTabla()
        fetch(`http://localhost:3000/FRF/doctores/${this.state.seleccion}`, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: 'delete',
        }).then(response => response.json())
            .then(document.getElementsByClassName("confirmar-eliminar")[0].style.display="none")
            .catch(err => console.log(err))
    }

    actualizarTabla=()=>{
        this.setState({doctores: this.state.doctores.filter(doc => doc._id != this.state.seleccion) })
        this.setState({seleccion: ""})
    }

    editarDoctor=()=>{
        
        this.state.doctores.map((doc)=>{
            if(doc._id==this.state.seleccion){
                this.props.loadDoc(doc);
            }
        })
    }
    ventanaEliminar=()=>{
        document.getElementsByClassName("confirmar-eliminar")[0].style.display="block"
    }

    render() {
        return (
            <div>
                <h1 className="titulo-doctor">Doctores</h1>
                <div className="scroll-doctores">
                    <table >
                        <thead>
                            <tr>
                                <th>nombre</th>
                                <th>Cedula</th>
                                <th>Controlador</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.doctores.map(doctor =>
                                <Doctor cargarSeleccion={this.cargarSeleccion} key={doctor._id} doctor={doctor}></Doctor>)}
                        </tbody>
                    </table>

                </div>
                <div className="botones">
                    <Link className="btn-agregarDoctor" to="/doctorAgregar">Agregar</Link>
                    <Link className="btn-editarDoctor" to="/doctorEditar" onClick={this.editarDoctor} >Editar</Link>
                    <a className="btn-eliminarDoctor" onClick={this.ventanaEliminar}>Eliminar</a>
                </div>
                <div className="confirmar-eliminar"> 
                    <h4>¿Estás seguro que quieres eliminar?</h4>
                    <div className="botones">
                        <button className="btn-agregarProducto" onClick={this.eliminarDoctor}>Aceptar</button>
                        <button className="btn-eliminarProducto"onClick={()=>document.getElementsByClassName("confirmar-eliminar")[0].style.display="none"} >Cancelar</button>
                    </div>
                    </div>
                
            </div>
        )
    }
}
