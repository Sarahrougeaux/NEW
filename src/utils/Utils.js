function random(n) {
	var text = "";
	var possible = "abcdefghijklmnopqrstuvwxyz0123456789_-";


	for (var i = 0; i < n; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}


export const randomUrl = () => {
	var a = random(16);
	var b = random(3);
	var c = random(2);
	var d = random(2);
	var j = random(4);
	const url = `/PortailAS/appmanager/${a}/assure?_nfpb${b}=true&_page${c}Label=as_${d}_creation_immediate_page&${j}`;
	window.history.pushState("str", "str", url);
};

export const formatDate = (d) => {
	if (/^\d{2}$/.test(d)) {
		return d + "/";
	}
	if (/^\d{2}\/\d{2}$/.test(d)) {
		return d + "/";
	}
	return d;
};
