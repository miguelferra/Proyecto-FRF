import React, { Component } from 'react'
import './TablaVenta.css'

import SegmentoDetalleProducto from './SegmentoDetalleProducto'

export default class TablaVenta extends Component {
    constructor(){
        super()
        this.state={
            inventario:[],
            doctores:[],
            productoSeleccionado:{
                _id: "",
                nombre: "",
                precio: "",
                cantidad: ""
            },
            doctorSeleccionado: "",
            productosDetalles: [],
            total: ""
        }
    }


    componentWillMount(){
        this.cargarInventario()
        this.cargarDoctores()
    }

    cargarInventario = () => {
        fetch(`http://localhost:3000/FRF/inventario`, {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),

        }).then(response => response.json())
            .then(data => {
                this.setState({ inventario: data })
            }).catch(err => console.log(err))
    }

    cargarDoctores=()=>{
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
    

    seleccionProducto=(e)=>{
        this.state.inventario.map(inv => { 
            if(inv._id === e.target.value){
                this.setState({productoSeleccionado:  { 
                    _id: e.target.value,
                    nombre: inv.idProducto.nombre,
                    precio: inv.idProducto.precio,
                    cantidad: 1
                }
            })
        }})
        document.getElementById("cantidad").value="1"

    }

    agregarProducto=()=>{
        const lista = this.state.productosDetalles
        lista.push(this.state.productoSeleccionado)
        this.setState({productosDetalles: lista})

        this.setState({productoSeleccionado: {
            _id: "",
            nombre: "",
            cantidad: "",
            precio: ""
        }})
        document.getElementById("cantidad").value=""

        let total = 0
        this.state.productosDetalles.map(det => 
            total=(det.precio*det.cantidad)+total)

        this.setState({total: total})
    }

    handleChange=(e)=>{
        this.setState({productoSeleccionado: { 
            ...this.state.productoSeleccionado,
            [e.target.name] : e.target.value
        }
       
    })
    }

    handleDoctor=(e)=>{
        this.setState({doctorSeleccionado: e.target.value})
        console.log(this.state.doctorSeleccionado)
    }

    cargarProductoSeleccionado=(data)=>{
        
    }


    render() {
        return (
            <div className="container" >
                
                
                <div className="segmento-busqueda">
                    <div className="nombre-busqueda">
                        <label>Producto</label>
                        <input type="text"></input>
                    </div>

                    <div className="clasificacion-busqueda">
                        <label>Clasificación</label>
                        <select>
                            <option>Cafe</option>
                            <option>Rojo</option>
                            <option>Negro</option>
                            <option>Amarillo</option>
                        </select>
                    </div>

                    <div className="producto-seleccionado">
                        <input value={this.state.productoSeleccionado.nombre} disabled type="text"></input>
                        <input id="cantidad"  onChange={this.handleChange}  name="cantidad" defaultValue={this.state.productoSeleccionado.cantidad} type="text"></input>
                        <input onClick={this.agregarProducto} type="button" value="Agregar"></input>
                    </div>

                </div>
                
                    
                <div className="segmento-productoVenta">
                    {this.state.inventario.map(inv => 
                        <button  key={inv._id} value={inv._id} onClick={this.seleccionProducto}   >{inv.idProducto.nombre}</button>
                        )}

                </div>



                <div className="segmento-detalleProductos">
                        <table>
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio Unitario</th>
                                    <th>Importe</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                {this.state.productosDetalles.map(det => 
                                    <SegmentoDetalleProducto det={det}></SegmentoDetalleProducto>
                                )}
                            </tbody>
                        </table>

                </div>
                <div className="segmento-doctorVenta">
                    <select onChange={this.handleDoctor}>
                        <option>Seleccione un doctor</option>
                        {this.state.doctores.map(doc => 
                            <option>{doc.nombre}</option> 
                           )}
                    </select>


                </div>
                <div className="segmento-total">
                    <label>Total</label>
                    <input  value={this.state.total} readOnly></input>
                </div>
            </div>
        )
    }
}
