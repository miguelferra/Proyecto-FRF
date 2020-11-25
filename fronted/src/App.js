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

class App extends Component{

  constructor(){
    super();
    this.state={
      productos: [],
      doctores: [],
   
    }
   

  }
  
  loadProductos =(data)=>{
    this.setState({productos: data})
    console.log("La info de data: ",this.state.productos)
  }

  loadDoctores = (data)=>{
    this.setState({doctores:data})
  }




  componentDidMount(){
    this.cargarProductos()
    //this.cargarDoctores()
}



cargarProductos=()=>{
fetch(`http://localhost:3000/FRF/productos`, {
    method: 'get',
    headers: new Headers({
        'Content-Type': 'application/json'
    }),
   
}).then(response => response.json())
    .then(data => {

   
        console.log("bniaa",data)
        this.setState({productos: data})
    })
   
    .catch(err => console.log(err))
}

/*
cargarDoctores=()=>{
fetch(`http://localhost:3000/FRF/doctores`, {
    method: 'get',
    headers: new Headers({
        'Content-Type': 'application/json'
    }),
   
}).then(response => response.json())
    .then(data => {

   
        console.log("doctores",data)
        this.props.loadDoctores(data)
    
    })
   
    .catch(err => console.log(err))
}
*/
  

  

  render(){
    return (
      <div>

        <Router>
          <Route  path="/" render={()=>{
            return <div>
              <Menu loadProductos={this.loadProductos}  loadDoctores={this.loadDoctores} className="menu"></Menu>
            </div>
          }}>
          </Route>
          
        <Route path="/producto" render={()=>{
          return <div>
            <TablaProductos productos={this.state.productos}></TablaProductos>
            
            
          </div>
        }}>
        </Route>
        <Route path="/productoAgregar" render={()=>{
          return <div>
            
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
