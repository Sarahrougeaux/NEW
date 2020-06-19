import React from "react";
import "./css/input.css";

class Input extends React.Component {
	render() {
		if (!this.props.msg_error) {
			return (
				<div>
					<label className="r_ddc_half_screen">
						{this.props.label}:<span style={{ "color": "blue" }}>*</span>
					</label>
					<input
						name={this.props.name}
						placeholder={this.props.holder}
						size={this.props.size}
						type={this.props.type}
						value={this.props.value}
						onChange={this.props.onChange}
						style={this.props.style}
					/>
					{this.props.card}
				</div>
			);
		}
		return (
			<div>
				<div>
					<label className="r_ddc_half_screen">
						{this.props.label}:<span style={{ "color": "blue" }}>*</span>
					</label>
					<b className="erreur_champ">
						<input
							name={this.props.name}
							size={this.props.size}
							type={this.props.type}
							value={this.props.value}
							onChange={this.props.onChange}
						/>
					</b>
					{this.props.card_error}
				</div>
				<div className="right_side">
					<span className="message_erreur">
						{this.props.msg_error}
					</span>
				</div>
			</div>
		);
	}
}
export default Input;
