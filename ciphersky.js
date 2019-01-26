var request = require('request');

class ciphersky {
	shorturl(url) {
		return new Promise((resolve, reject) => {
			request(`https://api.lvsh.tk/short.php?url=${url}`, (e, r, b) => {
				resolve(b);
			});
		});
	}
}

module.exports = ciphersky;
