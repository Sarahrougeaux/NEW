import React from "react";
import  "./css/Header.css";
import logo from "./images/logo_regime_general";
class Header extends React.Component{
    render(){
        return(
            <header>
                <div className="tetiere">
                    <div className="bandeau">
                        <h1>Compte ameli</h1>
                        <div className="liens">
                            <a> Aller au contenu </a> &nbsp;|&nbsp; <a> Recommandations de sécurité </a>
                        </div>
                    </div>
                    <a className="r_lien_image">
                        <img alt="" src={logo} className="logoam"/>
                    </a>
                </div>
            </header>
        )
    }
}
export default Header;
