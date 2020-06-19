import React from "react";
import "./css/contents.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { ToastContainer } from "react-toastify";

class Contents extends React.Component {
	render() {
		return (
			<div id="container">
				<Header id="" />
				<div id="body">
					<section>
						<div className="titlebar">
							<h1 className="wlp-bighorn-titlebar-title-panel">
								DEMANDE DE REMBOURSEMENT EN LIGNE.
							</h1>
						</div>
						{this.props.children}
					</section>

				</div>
				<Footer id="footer" />
				<ToastContainer />
			</div>
		);
	}
}

export default Contents;
