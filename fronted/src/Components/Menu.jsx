import React, { Component } from 'react';
import './Menu.css';



class Menu extends Component{

    constructor(props){
        super(props);
        this.state = {
            showAdminCursos: false,
        }
    }

    abrirAdminCurso= ()=>{
        this.setState({showAdminCurso:true});
    }
    
    render(){
        return(
        
            <div className="full-width">
                <nav className= "menu-head">
                    <ul className="menu-opciones">
                        <li className="menu-opciones-listado"><a href = "/">Venta</a></li>
                        <li className="menu-opciones-listado"><a href = "producto">Productos</a></li>
                        <li className="menu-opciones-listado"><a href = "inventario">Inventario</a> </li>
                        <li><a href = "doctor"> Doctores </a></li>
                        
                    </ul>
                </nav>
            </div>  
            
        );
        
    }
   
    
}

export default Menu;