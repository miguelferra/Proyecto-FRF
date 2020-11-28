import React, { Component } from 'react'
import Doctor from './Doctor'
import './TablaDoctor.css'


export default class TablaDoctor extends Component {
    render() {
        return (
            <div className="scroll">
                <table >
                    <thead>
                        <tr>
                        <th>id</th>
                        <th>nombre</th>
                        <th>RFC</th>
                       
                        <th>Controlador</th>
                        </tr>
                    </thead>

                    {this.props.doctores.map(doctor => 
                        <Doctor doctor ={doctor}></Doctor>)}

                </table>
            </div>
        )
    }
}
