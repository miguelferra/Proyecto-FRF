import './App.css';
import Menu from './Components/Menu'
import TablaProductos from './Components/productos/TablaProductos';
import Productos from './Components/productos/Productos.json'
import Doctores from './Components/doctor/Doctores.json'
import React, {Component} from 'react'
import FormProducto from './Components/productos/FormProducto';
import FormInventario from './Components/inventario/FormInventario';
import TablaInventario from './Components/inventario/TablaInventario';
import TablaDoctor from './Components/doctor/TablaDoctor'


import {BrowserRouter as Router, Route} from 'react-router-dom';
import FormDoctor from './Components/doctor/FormDoctor';

class App extends Component{

  constructor(){
    super();
    this.state={
      productos: Productos,
      doctores: Doctores
    }
  }
  
  loadProductos =(data)=>{
    this.setState({productos: data})
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
            <TablaProductos productos={this.state.productos}></TablaProductos>
            <FormProducto productos={this.state.productos} loadProductos={this.loadProductos}></FormProducto>
          </div>
        }}>
        </Route>

        <Route path="/inventario" render={()=>{
          return <div>
            <TablaInventario productos={this.state.productos}></TablaInventario>
            <FormInventario></FormInventario>
          </div>
        }}>

        </Route>

        <Route path="/doctor" render={()=>{
          return <div>
            <TablaDoctor loadProductos = {this.loadProductos} doctores={this.state.doctores}></TablaDoctor>
            <FormDoctor></FormDoctor>
          </div>
        }}>

        </Route>


        </Router>
  
        
        
   

      </div> 
        
     
        
    );
  }
}

export default App;
