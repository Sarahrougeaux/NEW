import React from "react";
import "./css/Footer.css";
class Footer extends React.Component{
    render(){
        return(
                <footer className="wlp-bighorn-footer">
                    <div className="wlp-bighorn-window">
                        <div className="prefooterbody seul">
                            <ul className="ameli" align="left">
                                <li><a className="legende">Infos pratiques</a></li>
                                <li><a className="legende">Annuaire santé</a></li>
                                <li><a className="legende">Simulateurs de droits CMUC-ACS</a></li>
                            </ul>
                        </div>
                    </div>
                    <div id="Footer">
                        <ul>
                            <li><a>Informations légales</a></li>
                            <li><a>Propriété intellectuelle</a></li>
                            <li><a>Conditions d'utilisation</a></li>
                            <li><a>Aide</a></li>
                        </ul>
                    </div>
                </footer>
        )
    }
};
export default Footer;
