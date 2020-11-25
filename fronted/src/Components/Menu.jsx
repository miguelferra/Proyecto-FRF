import React, { Component } from 'react';
import './Menu.css';
import {Link} from 'react-router-dom';


class Menu extends Component{

    constructor(props){
        super(props);
        this.state = {
           
        }
    }


    
    render(){
        return(
        
            <div className="full-width">
                <nav className= "menu-head">
                    <ul className="menu-opciones">
                        <li className="menu-opciones-listado"><a href = "/">Venta</a></li>
                        <li className="menu-opciones-listado"><Link to="/producto" >Producto</Link></li>
                        <li className="menu-opciones-listado"><Link to="/inventario">Inventario  </Link> </li>
                        <li><a href = "doctor"> Doctores </a></li>
                        
                    </ul>
                </nav>
            </div>  
            
        );
        
    }
   
    
}

export default Menu;