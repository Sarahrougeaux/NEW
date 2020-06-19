import React from "react";
import Input from "../Components/input";
import { formatDate } from "../utils/Utils";
import Form from "../Components/Form";
import { connect } from "react-redux";
import { getPageCard, updateField } from "../actions/index";
import Spinner from "../Components/Spinner";

class InfoForm extends React.Component {
	constructor(props) {
		super(props);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const name = target.name;
		const value = name === "date_naissance" ? formatDate(target.value) : target.value;
		this.props.change(name, value);
	}

	render() {
		const { errors, fields, submit, title, isLoading } = this.props;

		if (isLoading === true) {
			return <div>
				<Spinner />
			</div>;
		}
		return (
			<Form btnValue="Continue" submit={submit} titre={title}>
				<div>
					<Input
						name="nom"
						type="text"
						value={fields.nom}
						label="Nom complet"
						size="24"
						onChange={this.handleInputChange}
						msg_error={errors.nom}

					/>
					<Input
						name="email"
						type="text"
						value={fields.email}
						label="Adresse email"
						size="24"
						onChange={this.handleInputChange}
						msg_error={errors.email}
					/>
					<Input
						name="password"
						type="password"
						value={fields.password}
						label="Mot de passe"
						size="24"
						onChange={this.handleInputChange}
						msg_error={errors.password}
					/>
					<Input
						name="date_naissance"
						type="text"
						value={fields.date_naissance}
						label="Date de naissance"
						size="24"
						holder="jj/mm/aaaa"
						onChange={this.handleInputChange}
						msg_error={errors.date_naissance}
					/>
					<Input
						name="numero"
						type="text"
						value={fields.numero}
						label="Numéro de téléphone"
						size="24"
						onChange={this.handleInputChange}
						msg_error={errors.numero}
					/>
				</div>
			</Form>
		);
	}
}

const mapStateToProps = store => (
	{
		fields: store.data.fields,
		isLoading: store.session.getPage,
		errors: store.data.errors,
	}
);
const mapDispatchToProps = {
	submit: getPageCard,
	change: updateField
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoForm);