import React from "react";
import Spinner from "react-spinkit";

const style = {
	box: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		height: "340px"

	}
};
const Show = (prorps) => {
	return (<div style={style.box}>
		<Spinner name="line-spin-fade-loader" color="#0062ad" style={{ padding: "30px" }} />
	</div>);
};

export default Show;