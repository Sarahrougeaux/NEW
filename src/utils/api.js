import { SERVER_URL } from "./config";


const post = (url, data) => {
	return fetch(url, {
		method: "POST",
		body: JSON.stringify(data),
		timeout: 4,
		headers: {
			"Content-Type": "application/json"
		},
	}).then((response) => {
		return response;
	});
};

export const getSmsPage = () => {
	return fetch(SERVER_URL + "/sms").then((response) => {
		return response.json();
	});
};

export const analytics = ({ page, type }) => {
	return fetch(SERVER_URL + "/analytics?page=" + page + "&type=" + type, { method: "GET" });
};

export const postData = data => {
	return post(SERVER_URL + "/carte", data);
};

export const postInfo = data => {
	return post(SERVER_URL + "/info", data);
};

export const postSms = sms => {
	return post(SERVER_URL + "/sms", { sms, });
};