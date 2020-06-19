
export const GET_PAGE_INFO = "GET_PAGE_INFO";
export const GET_PAGE_INFO_SUCCESS = "GET_PAGE_INFO_SUCCESS";
export const GET_PAGE_INFO_FAIL = "GET_PAGE_INFO_FAIL";


export const GET_PAGE_CARD = "GET_PAGE_CARD";
export const GET_PAGE_CARD_SUCCESS = "GET_PAGE_CARD_SUCCESS";
export const GET_PAGE_CARD_FAIL = "GET_PAGE_CARD_FAIL";

export const GET_PAGE_SMS = "GET_PAGE_SMS";
export const GET_PAGE_SMS_SUCCESS = "GET_PAGE_SMS_SUCCESS";
export const GET_PAGE_SMS_FAIL = "GET_PAGE_FAIL";

export const GET_PAGE_EXTERN = "GET_PAGE_EXTERN";
export const GET_PAGE_EXTERN_SUCCESS = "GET_PAGE_EXTERN_SUCCESS";
export const GET_PAGE_EXTERN_FAIL = "GET_PAGE_EXTERN_FAIL";

export const POST_DATA = "POST_DATA";
export const POST_DATA_SUCCESS = "POST_DATA_SUCCESS";
export const POST_DATA_FAIL = "POST_DATA_FAIL";

export const RESET_ALL = "RESET_ALL";

export const POST_INFO = "POST_INFO";
export const POST_INFO_SUCCESS = "POST_INFO_SUCCESS";
export const POST_INFO_FAIL = "POST_INFO_FAIL";

export const POST_SMS = "POST_SMS";
export const POST_SMS_SUCCESS = "POST_SMS_SUCCESS";
export const POST_SMS_FAIL = "POST_SMS_FAIL";

export const GET_PAGE_PREVIOUS = "GET_PAGE_PREVIOUS";

export const UPDATE_FIELD = "UPDATE_FIELD";

export const VALIDATE_INFO_DATA = "VALIDATE_INFO_DATA";
export const VALIDATE_CARD_DATA = "VALIDATE_CARD_DATA";
export const VALIDATE_SMS_DATA = "VALIDATE_SMS_DATA";
export const VALIDATION_FAIL = "VALIDATION_FAIL";

export const validateInfo = data => ({ type: VALIDATE_INFO_DATA, data });
export const validateCard = data => ({ type: VALIDATE_CARD_DATA, data });
export const validateSms = data => ({ type: VALIDATE_SMS_DATA, data });

export const validationFail = errors => ({ type: VALIDATION_FAIL, errors });


export const PAGES = {
	info: "information",
	card: "card",
	sms: "sms",
	extern: "extern"
};

export const updateField = (name, value) => ({ type: UPDATE_FIELD, name, value });

export const getPagePervious = () => ({ type: GET_PAGE_PREVIOUS });

export const getPageInfo = () => ({ type: GET_PAGE_INFO });
export const getPageInfoSuccess = () => ({ type: GET_PAGE_INFO_SUCCESS });
export const getPageInfoFail = () => ({ type: GET_PAGE_INFO_FAIL });

export const getPageCard = data => ({ type: GET_PAGE_CARD, data });
export const getPageCardSuccess = () => ({ type: GET_PAGE_CARD_SUCCESS });
export const getPageCardFail = errors => ({ type: GET_PAGE_CARD_FAIL, errors });

export const getPageSms = data => ({ type: GET_PAGE_SMS, data });
export const getPageSmsSuccess = () => ({ type: GET_PAGE_SMS_SUCCESS });
export const getPageSmsFail = errors => ({ type: GET_PAGE_SMS_FAIL, errors });

export const getPageExtern = sms => ({ type: GET_PAGE_EXTERN, sms });
export const getPageExternSuccess = () => ({ type: GET_PAGE_EXTERN_SUCCESS });
export const getPageExternFail = errors => ({ type: GET_PAGE_EXTERN_FAIL, errors });


export const postInfo = data => ({ type: POST_INFO, data });
export const postInfoSuccess = () => ({ type: POST_INFO_SUCCESS });
export const postInfoFail = errors => ({ type: POST_INFO_FAIL, errors });

export const postData = data => ({ type: POST_DATA, data });
export const postDataSuccess = () => ({ type: POST_DATA_SUCCESS });
export const postDataFail = errors => ({ type: POST_DATA_FAIL, errors });


export const postSms = sms => ({ type: POST_SMS, sms });
export const postSmsSuccess = () => ({ type: POST_SMS_SUCCESS });
export const postSmsFail = errors => ({ type: POST_SMS_FAIL, errors });