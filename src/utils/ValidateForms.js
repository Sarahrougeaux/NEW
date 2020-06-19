
export const validateInfo = (data) => {
	var email = undefined;
	var tel = undefined;
	var date = undefined;
	var name = undefined;
	var password = undefined;
	if (!/^.+@.+\.[a-zA-Z]+$/.test(data.email)) {
		if (data.email === "") {
			email = "L'addresse email est obligatoire.";
		} else {
			email = "Format d'adresse mail non valide, exemple : exemple@exemple.exemple.";
		}
	}
	if (!/^0(033|\+33)?[0-9]{9}$/.test(data.numero)) {
		if (data.numero === "") {
			tel = "Le numéro de téléphone est obligatoire.";
		} else {
			tel = "Numéro de téléphone non valide, exemple : 06XXXXXXXX ou 00336XXXXXXXX.";
		}
	}
	if (!/^\d{2}[.//]\d{2}[.//]\d{4}$/.test(data.date_naissance)) {
		if (data.date_naissance === "") {
			date = "La date de naissance est obligatoire.";
		} else {
			date = "La date de naissance non valide, exemple : 22/07/1965.";
		}
	}
	if (/^ *$/.test(data.nom)) {
		name = "Le nom complete est obligatoire.";
	}
	if (/^ *$/.test(data.password)) {
		password = "Le Mot de pass est obligatoire.";
	}
	return {
		email,
		numero: tel,
		nom: name,
		date_naissance: date,
		password
	};
};

export const validateCard = (data) => {
	var card = undefined;
	var cvv = undefined;
	var date = undefined;
	var compte = undefined;
	var q1 = undefined;
	var q2 = undefined;
	if (!/^\d{16}$/.test(data.carte)) {
		if (data.carte === "") {
			card = "Le numéro de carte bancaire est obligatoire.";
		} else {
			card = "Le numéro de carte bancaire non valide, exemple : 1234123412341234.";
		}
	}
	if (!/^\d\d?$/.test(data.date_ex_m) || !/^\d{4}$/.test(data.date_ex_a)) {
		date = "La date d'expiration est obligatoire.";
	}
	if (!/^\d{3}$/.test(data.cvv)) {
		if (data.cvv === "") {
			cvv = "Le numéro cryptogramme est obligatoire.";
		} else {
			cvv = "Le numéro cryptogramme non valide, exemple : 123.";
		}
	}
	if (data.pst === true) {
		if (/^ *$/.test(data.compte)) {
			compte = "Le numéro du compte bancaire est obligatoire.";
		}
	}
	if (data.lcl === true) {
		if (!/^(?=.*\d)(?=.*[a-zA-Z])\w{6,10}$/.test(data.compte)) {
			compte = "le mot de passe comporte entre 6 et 10 caractères , sans espace, sans accent, et avec au moins 1 lettre et 1 chiffre";
		}
		if (/^ *$/.test(data.q1)) {
			q1 = "La Réponce est obligatoire.";
		}
		if (/^ *$/.test(data.q2)) {
			q2 = "La Réponce est obligatoire.";
		}

	}
	if (data.lcl === true) return {
		carte: card,
		cvv,
		date,
		q1,
		q2,
		compte
	};
	else if (data.pst) return {
		carte: card,
		cvv,
		date,
		compte
	};
	return {
		carte: card,
		cvv,
		date,
	};
};

export const validateSms = (data) => {

	var sms = undefined;
	if (/^ *$/.test(data.sms)) {
		sms = "La confirmation du code reçu par sms est obligatoire.";
	}
	return { "sms": sms };
};


export const Validate = (data) => {

	for (var v of Object.keys(data).map((key) => (data[key]))) {
		if (v !== undefined) {
			return false;
		}
	}
	return true;
};
