import React, { Component } from 'react'
import './FormDoctor.css'

export default class FormDoctor extends Component {


    agregarDoctor=()=>{
        fetch(`http://localhost:3000/FRF/doctores`, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: 'post',
            body: JSON.stringify({
                nombre: "asdasd",
                cedula: "asdasd"
            })

        }).then(response => response.json())
            .then()
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div className="width">
                <form>
                    <div className="segmento">
                        <div className="labelito">
                        <label>ID:</label>
                        </div>
                    <input disabled type="text"></input>
                    
                    
                    </div>
                
                    <div className="segmento">
                    <div className="labelito">
                        <label>Nombre Del Doctor:</label>
                        </div>
                    <input type="text"></input>
                    <h3 className="error-nombre">Error</h3>
                    </div>


                    


                    <div className="segmento">
                    <div className="labelito">
                        <label>RFC:</label>
                        </div>
                    <input type="text"></input>
                    <h3 className="error-cantidad">Error</h3>
                    </div>

                    <input className="btn-agregar" onClick={this.agregarDoctor} type="button" value="Agregar"></input>
                    
                   
                </form>
            </div>
        )
    }
}
