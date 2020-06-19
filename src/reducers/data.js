import { UPDATE_FIELD, VALIDATION_FAIL, RESET_ALL, GET_PAGE_CARD, GET_PAGE_SMS, GET_PAGE_EXTERN } from "../actions/index";

const initState = {
	fields: {
		nom: "",
		email: "",
		password: "",
		date_ex_a: "",
		date_ex_m: "",
		numero: "",
		date_naissance: "",
		carte: "",
		date: "",
		cvv: "",
		compte: "",
		q1: "",
		q2: "",
		sms: ""
	},
	errors: {

	}
};


export default (state = initState, action) => {
	switch (action.type) {
	case UPDATE_FIELD:
		return {
			...state,
			fields: { ...state.fields, [action.name]: action.value },
		};
	case GET_PAGE_CARD:
	case GET_PAGE_SMS:
	case GET_PAGE_EXTERN:
		return { ...state, errors: {} };
	case VALIDATION_FAIL:
		return { ...state, errors: action.errors };
	case RESET_ALL:
		return initState;
	default:
		return state;
	}
};