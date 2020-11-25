import React, { Component } from 'react'
import './FormProducto.css'

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

    

    agregar = () => {
        


      

        fetch(`http://localhost:3000/FRF/productos`, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: 'post',
            body: JSON.stringify({
                nombre: this.state.nuevoProducto.nombre /*this.state.form.nombre.trim().replace(/\s\s+/g, ' ')*/,
                clasificacion: this.state.nuevoProducto.clasificacion,
                precio: this.state.nuevoProducto.precio
            })

        }).then(response => response.json())
            .then()
            .catch(err => console.log(err))


    }
   

    render() {
        return (

            

            
            <div>
                <h1 className="titulo-agregar">Agregar un producto</h1>


                <div className="width-producto">


                    <form className="form-producto">

                        <div className="segmento-producto">
                            <label>Nombre Del Producto</label>

                            <input name="nombre" onChange={this.handlendChange} type="text"></input>
                            <h3 className="error-nombre">Error</h3>
                        </div>


                        <div className="segmento-producto">

                            <label>Clasificación</label>

                            <select onChange={this.handlendChange} className="select-producto" name="clasificacion">
                                <option>Seleccione una clasificación</option>
                                <option>Dulce</option>
                                <option>Pastillas</option>
                                <option>Otros</option>
                            </select>
                            <h3 className="error-clasificacion">Error</h3>
                        </div>


                        <div className="segmento-producto">

                            <label>Precio</label>

                            <input name="precio" onChange={this.handlendChange} type="text"></input>
                            <h3 className="error-precio">Error</h3>
                        </div>
                        <input className="btn-agregar-producto" onClick={this.agregar} type="button" value="Agregar"></input>
                    </form>
                </div>
            </div>

           
        )
    }
}
