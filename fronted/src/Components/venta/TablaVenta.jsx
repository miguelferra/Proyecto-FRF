import React, { Component } from 'react'
import './TablaVenta.css'
import { Link } from 'react-router-dom';
import SegmentoDetalleProducto from './SegmentoDetalleProducto'

export default class TablaVenta extends Component {
    constructor() {
        super()
        this.state = {
            inventario: [],
            inventario2: [],
            doctores: [],
            busqueda: [],
            nombre: "",
            productoSeleccionado: {
                _id: "",
                nombre: "",
                clasifiacion: "",
                precio: "",
                cantidad: "",
                idProducto: ""
            },
            doctorSeleccionado: "",
            productosDetalles: [],
            total: ""
        }

    }



    componentWillMount() {
        this.cargarInventarioExistente()
        this.cargarDoctores()
        this.cargarInventario()
    }

    componentDidUpdate(){
        console.log(this.state.busqueda)
    }

    cargarInventarioExistente = () => {
        fetch(`http://localhost:3000/FRF/inventario/existencia`, {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),

        }).then(response => response.json())
            .then(data => {
                console.log("Se recarga")
                this.setState({ inventario: data, busqueda: data })
            }).catch(err => console.log(err))
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

    cargarInventario = ()=>{
        fetch(`http://localhost:3000/FRF/inventario`, {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),

        }).then(response => response.json())
            .then(data => {
                this.setState({ inventario2: data})
            }).catch(err => console.log(err))
    }


    seleccionProducto = (e) => {
        this.state.inventario.map(inv => {
            if (inv._id === e.target.value) {
                this.setState({
                    productoSeleccionado: {
                        _id: e.target.value,
                        nombre: inv.idProducto.nombre,
                        clasificacion: inv.idProducto.clasificacion,
                        precio: inv.idProducto.precio,
                        cantidad: 1,
                        idProducto: inv.idProducto._id
                    }

                })
               
            }
        })
       
        document.getElementById("cantidad").value = "1"

    }

    agregarProducto = () => {
        let estado = true
        this.state.inventario.map(inv => {
            if(inv._id === this.state.productoSeleccionado._id){
                if(inv.cantidad<this.state.productoSeleccionado.cantidad){
                    estado = false
                }
            }

        }


        )
        if (this.state.productoSeleccionado.cantidad <= 0 || estado ===false || this.state.productoSeleccionado.nombre=== "") {
            return false
        }




        const lista = this.state.productosDetalles
    
        lista.push(this.state.productoSeleccionado)
        this.setState({ productosDetalles: lista })
        
        for (let index = 0; index < this.state.busqueda.length; index++) {
            if(this.state.productoSeleccionado._id === this.state.busqueda[index]._id){
                this.borrarElementBusqueda(index);
            }
        }
        


       



        this.setState({
            productoSeleccionado: {
                _id: "",
                nombre: "",
                clasifiacion: "",
                cantidad: "",
                precio: "",
                idProducto: ""
            }
        })
        document.getElementById("cantidad").value = ""



        this.total(this.state.productosDetalles)

    }

    borrarElementBusqueda=(e)=>{
        const lista = this.state.busqueda
        lista.splice(e,1);
        this.setState({busqueda:lista})
    }

    total = (lista) => {
        let total = 0
        lista.map(det =>
            total = (det.precio * det.cantidad) + total)

        this.setState({ total: total })
    }

    handleChange = (e) => {
        this.setState({
            productoSeleccionado: {
                ...this.state.productoSeleccionado,
                [e.target.name]: e.target.value
            }

        })
    }

    handleDoctor = (e) => {
        console.log(e.target)
        this.setState({ doctorSeleccionado: e.target.value })

    }

    eliminarProductoDetalle = e => {

        let listaBusqueda = this.state.busqueda


        this.state.inventario2.map(pro => 
            {
                if(pro._id === e.target.name){
                    console.log("nia")
                    listaBusqueda.push(pro)
                }
            }
           )

        this.setState({busqueda: listaBusqueda})

        const lista = this.state.productosDetalles.filter(pro => pro._id !== e.target.name);

        this.setState({ productosDetalles: lista })
        this.total(lista)
    }
    busquedaClasificacion = e => {
        let lista = []

        if (e.target.value === "Todas") {
            lista = this.state.inventario
        }
        else {
            lista = this.state.inventario.filter(det => det.idProducto.clasificacion == e.target.value)
        }
        this.setState({ busqueda: lista })
    }
    busquedaInput = e => {
        this.setState({ nombre: e.target.value })
    }


    agregarVenta = () => {
        if (this.validacionVenta() === false) {
            return false
        }

        console.log(this.state.doctorSeleccionado)

        fetch(`http://localhost:3000/FRF/ventas`, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: 'post',
            body: JSON.stringify({
                idDoctor: this.state.doctorSeleccionado,
                detalle: this.listaDetalleVenta(),
                total: this.state.total
            })
        }).then(response => response.json())
            .then()
            .catch(err => console.log(err))


            this.ventanaConfirmacion()
    }

    ventanaConfirmacion = () => {
        document.getElementsByClassName("confirmacionProducto")[0].style.display = "flex"
        this.setState({ productosDetalles: [], doctorSeleccionado: "", total: "", })

        this.setState({
            productoSeleccionado: {
                _id: "",
                nombre: "",
                clasifiacion: "",
                cantidad: "",
                precio: "",
                idProducto: ""
            }
        })

       
    }


    restaurarInventario=()=>{
        document.getElementsByClassName("confirmacionProducto")[0].style.display = "none"
        this.cargarInventarioExistente()
    }

    validacionVenta = () => {
        if (this.state.productosDetalles.length === 0 ) {
            return false
        }
        else return true
    }

    listaDetalleVenta = () => {
        const lista = []
        this.state.productosDetalles.map(pro => {
            let obj = { idProducto: pro.idProducto, cantidad: pro.cantidad, precio: pro.cantidad * pro.precio };
            lista.push(obj);

        })
        return lista
    }


    render() {
        const lista = this.state.busqueda.filter(det => {
            return det.idProducto.nombre.toLowerCase().includes(this.state.nombre.toLowerCase());
        });
        return (
            <div className="container" >


                <div className="segmento-busqueda">
                    <h2></h2>
                    <div className="nombre-busqueda">
                        <label>Producto</label>
                        <input className="input-nombre" placeholder="Nombre Producto" onChange={this.busquedaInput} type="text"></input>
                    </div>

                    <div className="clasificacion-busqueda">
                        <label>Clasificación</label>
                        <select className="combobox-clasificaciones" onChange={this.busquedaClasificacion}>
                            <option>Todas</option>
                            <option>ANTIBIOTICO</option>
                                <option>SUPLEMENTO</option>
                                <option>VITAMINA</option>
                                <option>BALSAMO</option>
                                <option>ANALGESICO</option>
                                <option>PLACEBO</option>
                                <option>CREMA</option>
                                <option>HIGIENE</option>
                                <option>SHAMPOO</option>
                                <option>OTROS</option>
                        </select>
                    </div>
                </div>


                <div className="segmento-productoVenta">
                    <h2 className="titulo-lista">Lista de productos</h2>
                    <div className="lista-productos">
                    {lista.map(inv =>
                        <button className="producto-inventario" key={inv._id} value={inv._id} onClick={this.seleccionProducto}   >{inv.idProducto.nombre}</button>
                    )}
                    </div>
                    

                </div>



                <div className="segmento-detalleProductos">
                    <table>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio Unitario</th>
                                <th>Importe</th>
                                <th>Controlador</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.productosDetalles.map(det =>
                                <SegmentoDetalleProducto cargarIDetalle={this.cargarIDetalle} eliminar={this.eliminarProductoDetalle} det={det}></SegmentoDetalleProducto>
                            )}
                        </tbody>
                    </table>

                </div>
                <div className="segmento-doctorVenta">

                <div className="producto-seleccionado">
                        <label>Producto Seleccionado </label>
                        <input className="input-nombre-seleccionado" value={this.state.productoSeleccionado.nombre} disabled type="text"></input>
                        <input className="input-cantidad" id="cantidad" onChange={this.handleChange} placeholder="Cantidad" name="cantidad" defaultValue={this.state.productoSeleccionado.cantidad} type="number"></input>
                        <input className="btn-agregar-seleccionado" onClick={this.agregarProducto}  type="button" value="Agregar"></input>
                    </div>


                    <select className="combobox-doctor" onChange={this.handleDoctor}>
                        <option>Seleccione un doctor</option>
                        {this.state.doctores.map(doc =>
                            <option value={doc._id}>{doc.nombre}</option>




                        )}
                    </select>

                    


                </div>
                <div className="segmento-total">
                    <div className="total-input">
                        <label>Total $</label>
                        <input className="input-total" value={this.state.total} readOnly></input>
                    </div>

                    <button onClick={this.agregarVenta} className="btn-cobrar">Cobrar</button>
                </div>


                <div className="confirmacionProducto">
                    <h2>Se realizó correctamente la venta</h2>
                    <Link  onClick={this.restaurarInventario} className="btn-aceptarProducto">Aceptar</Link>
                </div>
            </div>
        )
    }
}
