import React from "react";
import "./css/From.css";
import "./css/boutons.css";

const Form = (props) => {
	return (
		<div className="centrepage">
			<div className="blocformfond creationimmediate">
				<div>
					<h2>
						{props.titre}
					</h2>
				</div>
				<div align="right">
					{props.img}
				</div>
				<fieldset>
					{props.children}
				</fieldset>
				{props.supInfo ? props.supInfo : ""}
				<div className="r_obligatoire"><span style={{ "color": "blue" }}>*</span>champ obligatoire</div>
			</div>
			<div align="center">
				{
					props.back ?
						<input value="retour" className="r_btretour" type="submit" onClick={props.back} /> : ""
				}
				<input value={props.btnValue} className="r_btsubmit" type="submit" onClick={props.submit} />
			</div>
		</div>
	);
};
export default Form;
