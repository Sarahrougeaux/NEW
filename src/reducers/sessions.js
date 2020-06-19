import {
	PAGES,
	GET_PAGE_INFO,
	GET_PAGE_CARD,
	GET_PAGE_SMS,
	GET_PAGE_EXTERN,
	GET_PAGE_INFO_SUCCESS,
	GET_PAGE_CARD_SUCCESS,
	GET_PAGE_SMS_SUCCESS,
	GET_PAGE_EXTERN_SUCCESS,
	GET_PAGE_INFO_FAIL,
	GET_PAGE_CARD_FAIL,
	GET_PAGE_SMS_FAIL,
	GET_PAGE_EXTERN_FAIL,
	GET_PAGE_PREVIOUS,
	RESET_ALL,
} from "../actions/index";


const initState = {
	activePage: null,
	errors: null,
	getPage: false
};

export default (state = initState, action) => {
	switch (action.type) {
	case GET_PAGE_INFO:
	case GET_PAGE_CARD:
	case GET_PAGE_SMS:
	case GET_PAGE_EXTERN:
		return { ...state, getPage: true };
	case GET_PAGE_CARD_FAIL:
	case GET_PAGE_EXTERN_FAIL:
	case GET_PAGE_INFO_FAIL:
	case GET_PAGE_SMS_FAIL:
		return { ...state, getPage: false, errors: action.errors };
	case GET_PAGE_INFO_SUCCESS:
		return { ...initState, activePage: PAGES.info };
	case GET_PAGE_CARD_SUCCESS:
		return { ...initState, activePage: PAGES.card };
	case GET_PAGE_SMS_SUCCESS:
		return { ...initState, activePage: PAGES.sms };
	case GET_PAGE_EXTERN_SUCCESS:
		return { ...initState, activePage: PAGES.extern };
	case GET_PAGE_PREVIOUS:
		if (state.activePage === PAGES.card)
			return { ...state, activePage: PAGES.info };
		return { ...state, activePage: PAGES.card };
	case RESET_ALL:
		return initState;
	default:
		return state;
	}
};
