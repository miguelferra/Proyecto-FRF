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

    ventanaConfirmacion=()=>{
        this.validarNombre()
        this.validarClasificacion()
        this.validarPrecio()

        if(this.validarNombre()===false || this.validarClasificacion()===false || this.validarPrecio()===false){
            return false;
        }

        this.editarProducto();

        document.getElementsByClassName("confirmacionProducto")[0].style.display="flex"
    }

    

    componentDidMount(){
        document.getElementById("label-nombre").style.marginTop = "-35px"
        document.getElementById("label-precio").style.marginTop = "-35px"
        
    }

   


    validarNombre=()=>{
        const expNombre= RegExp(/^[0-9a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,-]{1,35}$/)
        const nombretrim = this.state.nombre.trim().replace(/\s\s+/g, ' ')
    
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
        const clas = this.state.clasificacion
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
        const preciotrim = this.state.precio.trim().replace(/\s\s+/g, ' ')
    
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

            
            <div>
                <h1 className="titulo-agregar">Editar un producto</h1>


                <div className="width-producto">


                    <form className="form-producto">

                        <div className="segmento-producto">
                        <input name="nombre" id="nombre" onChange={this.handlendNombre} value={this.state.nombre} type="text"></input>
                            <label id="label-nombre">Nombre Del Producto</label>

                            
                            <span id="error-nombre-producto">Campo incorrecto</span>
                        </div>


                        <div className="segmento-producto">

                            <label>Clasificación</label>
        
                            <select onChange={this.handlendClasifiacion} className="select-producto" name="clasificacion">
                                <option>Seleccione una clasificación</option>
                                <option>Dulce</option>
                                <option>Pastillas</option>
                                <option>Otros</option>
                            </select>
                            <span id="error-clasificacion-producto">Campo incorrecto</span>
                        </div>


                        <div className="segmento-producto">
                        <input name="precio" id="precio" value={this.state.precio} onChange={this.handlendPrecio} type="text"></input>
                            <label id="label-precio">Precio</label>

                            
                            <span id="error-precio-producto">Campo incorrecto</span>
                        </div>
                        <input className="btn-agregar-producto" onClick={this.ventanaConfirmacion} type="button" value="Editar"></input>
                    </form>
                </div>

                <div className="confirmacionProducto">
                    <h2>Se editó el pruducto</h2>
                    <Link to="producto" onClick={()=>document.getElementsByClassName("confirmacionProducto")[0].style.display="none"} className="btn-aceptarProducto">Aceptar</Link>
                </div>


            </div>
            </div>
            </div>

           
        )
    }
}
