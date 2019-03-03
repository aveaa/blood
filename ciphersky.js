module.exports = (class ciphersky {
	async shorturl(url) {
		require('request')(`https://api.lvsh.tk/short.php?url=${url}`, { json: true }, (e, r, b) => {
			return b;
		})
	}
})
