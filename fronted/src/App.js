import './App.css';
import Menu from './Components/Menu'
import TablaProductos from './Components/productos/TablaProductos';
import React, {Component} from 'react'
import FormProducto from './Components/productos/FormProducto';
import FormInventario from './Components/inventario/FormInventario';
import TablaInventario from './Components/inventario/TablaInventario';
import TablaDoctor from './Components/doctor/TablaDoctor'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import FormDoctor from './Components/doctor/FormDoctor';
import FormProductoEditar from './Components/productos/FormProductoEditar';
import FormDoctorEditar from './Components/doctor/FormDoctorEditar'


const initialState={
  datoProducto:{
    _id: "",
    nombre: "",
    clasificacion: "",
    precio: ""
  },
  datoInventario:{
    _id: "",
    nombre: "",
    cantidad: ""
  },
  datoDoctor:{
    _id: "",
    nombre: "",
    cedula: ""
  },
  seleccion: ""
}

class App extends Component{

  constructor(){
    super();
    this.state=initialState
  }

  loadPro=(data)=>{
    this.setState({datoProducto: {
      _id: data._id,
      nombre: data.nombre,
      clasificacion: data.clasificacion,
      precio: data.precio
    }})
  }
  loadInv=(data)=>{
    this.setState({datoInventario:{
      _id:data._id,
      nombre: data.nombre,
      cantidad: data.cantidad
    }})
  }
  loadDoc=(data)=>{
    this.setState({datoDoctor:{
      _id: data._id,
      nombre: data.nombre,
      cedula: data.cedula
    }})
  }

  



  render(){

    return (
      <div>
        
        <Router>
       
          <Route path="/" render={()=>{
            
            
            return <div>
              <Menu className="menu"></Menu>
              
            </div>
          }}>
          </Route>
          
        <Route path="/producto" render={()=>{
          return <div>
            <TablaProductos loadSeleccion={this.loadSeleccion} loadPro={this.loadPro} prueba={this.prueba} loadProductos={this.loadProductos} productos={this.state.productos}></TablaProductos>
            
            
          </div>
        }}>
        </Route>
        <Route path="/productoAgregar" render={()=>{
          return <div>
            
            <FormProducto></FormProducto>
          </div>
        }}>
        </Route>

        <Route path="/productoEditar" render={()=>{
        
          return <div>
            <FormProductoEditar producto={this.state.datoProducto} ></FormProductoEditar>
            
          </div>
        }}>
        </Route>
        

        <Route path="/inventario" render={()=>{
          return <div>
            <TablaInventario loadInv={this.loadInv}  inventario={this.state.inventario}></TablaInventario>
         
          </div>
        }}>
        </Route>

        <Route path="/inventarioEditar" render={()=>{
          return <div>
            <FormInventario inv={this.state.datoInventario}></FormInventario>
         
          </div>
        }}>
        </Route>
        
        

        <Route path="/doctor" render={()=>{
          return <div>
            <TablaDoctor loadDoc={this.loadDoc}></TablaDoctor>
        
          </div>
        }}>

        </Route>

        <Route path="/doctorAgregar" render={()=>{
          return <div>
            <FormDoctor></FormDoctor>
        
          </div>
        }}>
        </Route>
        <Route path="/doctorEditar" render={()=>{
          return <div>
            <FormDoctorEditar doctor={this.state.datoDoctor}></FormDoctorEditar>
        
          </div>
        }}>
        </Route>




        </Router>
      </div> 
        
     
        
    );
  }
}

export default App;
