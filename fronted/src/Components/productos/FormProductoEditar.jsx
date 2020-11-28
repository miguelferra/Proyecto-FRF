import React, { Component } from 'react'
import './FormProducto.css'
import {Link} from 'react-router-dom';

export default class FormProductoEditar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productos: this.props.productos,
                _id: this.props.producto._id,
                nombre: this.props.producto.nombre,
                clasificacion: this.props.producto.clasificacion,
                precio: this.props.producto.precio
        }
        
       
    }

    handlendNombre = (e) => {
        this.setState({
                nombre: e.target.value
            })
    }
    handlendClasifiacion = (e) => {
        this.setState({
                clasificacion: e.target.value
            })
    }
    handlendPrecio = (e) => {
        this.setState({
                precio: e.target.value
            })
    }

    

    editarProducto = () => {
        
        document.getElementsByClassName("confirmacionProducto")[0].style.display="flex"

      

        fetch(`http://localhost:3000/FRF/productos/${this.state._id}`, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: 'put',
            body: JSON.stringify({
                nombre: this.state.nombre /*this.state.form.nombre.trim().replace(/\s\s+/g, ' ')*/,
                clasificacion: this.state.clasificacion,
                precio: this.state.precio
            })

        }).then(response => response.json())
            .then()
            .catch(err => console.log(err))


    }

    confirmacion=()=>{
        document.getElementsByClassName("confirmacionProducto")[0].style.display="none"
    }

    render() {
        return (

            

            
            <div>
                <h1 className="titulo-agregar">Editar un producto</h1>


                <div className="width-producto">


                    <form className="form-producto">

                        <div className="segmento-producto">
                            <label>Nombre Del Producto</label>

                            <input name="nombre" onChange={this.handlendNombre} value={this.state.nombre} type="text"></input>
                            <h3 className="error-nombre">Error</h3>
                        </div>


                        <div className="segmento-producto">

                            <label>Clasificación</label>
        
                            <select onChange={this.handlendClasifiacion} className="select-producto" name="clasificacion">
                                <option>Seleccione una clasificación</option>
                                <option>Dulce</option>
                                <option>Pastillas</option>
                                <option>Otros</option>
                            </select>
                            <h3 className="error-clasificacion">Error</h3>
                        </div>


                        <div className="segmento-producto">

                            <label>Precio</label>

                            <input name="precio" value={this.state.precio} onChange={this.handlendPrecio} type="text"></input>
                            <h3 className="error-precio">Error</h3>
                        </div>
                        <input className="btn-agregar-producto" onClick={this.editarProducto} type="button" value="Editar"></input>
                    </form>
                </div>

                <div className="confirmacionProducto">
                    <h2>Se editó el pruducto</h2>
                    <Link to="producto" onClick={this.confirmacion} className="btn-aceptarProducto">Aceptar</Link>
                </div>


            </div>

           
        )
    }
}
