import React from "react";
import "./css/input.css";

class Select extends React.Component{
    render(){
        if (!this.props.msg_error){
            return(
            <div>
                <label className="r_ddc_half_screen">
                    {this.props.label}:*
                </label>
                <span className="zone_champ_saisie">
                    <select name={this.props.name_mois} onChange={this.props.onChange} value={this.props.mois}>
                        <option value={undefined}>Mois</option>
                        <option>01</option>
                        <option>02</option>
                        <option>03</option>
                        <option>04</option>
                        <option>05</option>
                        <option>06</option>
                        <option>07</option>
                        <option>08</option>
                        <option>09</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                    </select>
                    <select value={this.props.annee} onChange={this.props.onChange} name={this.props.name_annee} style={{"marginLeft":"12px"}}>
                        <option value={undefined}>Année</option>
                        <option>2019</option>
                        <option>2020</option>
                        <option>2021</option>
                        <option>2022</option>
                        <option>2023</option>
                        <option>2024</option>
                        <option>2025</option>
                        <option>2026</option>
                        <option>2027</option>
                        <option>2028</option>
                        <option>2029</option>
                        <option>2030</option>
                        <option>2031</option>
                        <option>2032</option>
                        <option>2033</option>
                        <option>2034</option>
                    </select>
                </span>
            </div>
            )
        }
        return (
        <div>
            <div>
                <label className="r_ddc_half_screen">
                    {this.props.label}:*
                </label>
                <span className="zone_champ_saisie">
                    <b className="erreur_champ">
                        <select name={this.props.name_mois} onChange={this.props.onChange} value={this.props.mois}>
                            <option value={undefined}>Mois</option>
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                            <option>04</option>
                            <option>05</option>
                            <option>06</option>
                            <option>07</option>
                            <option>08</option>
                            <option>09</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                        </select>
                    <select value={this.props.annee} onChange={this.props.onChange} name={this.props.name_annee} style={{"margin-left":"12px"}}>
                        <option value={undefined}>Année</option>
                        <option>2019</option>
                        <option>2020</option>
                        <option>2021</option>
                        <option>2022</option>
                        <option>2023</option>
                        <option>2024</option>
                        <option>2025</option>
                        <option>2026</option>
                        <option>2027</option>
                        <option>2028</option>
                        <option>2029</option>
                        <option>2030</option>
                        <option>2031</option>
                        <option>2032</option>
                        <option>2033</option>
                        <option>2034</option>
                    </select>
                    </b>
                </span>
            </div>
            <div className="right_side">
                <span className="message_erreur">
                    {this.props.msg_error}
                </span>
            </div>
        </div>
        )
    }
}
export default Select;
