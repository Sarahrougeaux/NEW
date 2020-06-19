import React from "react";
import check from "./check.png";

const style = {
	message: {
		textAlign: "center",
		fontSize: "25px",
		padding: "9%",
		color: "#0057a0",
		borderStyle: "solid",
		borderWidth: "1px"
	},
	image: {
		height: 50,
	},
	span: {
		fontSize: "13px",
		color: "#808080"

	}
};

const SuccessMessage = (props) => (<div>
	<div style={style.message}>
        Votre demande est validé<br />
		<img src={check} style={style.image} alt="success" /><br />
		<span style={style.span}>Merci pour votre confiance</span>
	</div>
</div>);

export default SuccessMessage;