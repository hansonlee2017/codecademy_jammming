let accessToken = '';
let client_id = 'd09fde2a4c2c442dbc24ea0a32edfe19';
let redirectURI = 'http://localhost:3000';


let Spotify = {
	getAccessToken: function() { // get access token from URL
		console.log(window.location.href);
		let returnURI = window.location.href; // get current url
		let accessTokenMatch = returnURI.match(/access_token=([^&]*)/); // use regex to get accessToken
		let expiresInMatch = returnURI.match(/expires_in=([^&]*)/); // get expires in xxx seconds
		console.log(accessTokenMatch);
		console.log(expiresInMatch);
		
		
		if (accessToken.legnth > 0) {  // already have a token
			return accessToken;
		} else if (accessTokenMatch && expiresInMatch) 
		{ // do not have the token but can get it from the URL
		  // example of returnURL:  'https://example.com/callback#access_token=NwAExzBV3O2Tk&token_type=Bearer&expires_in=3600&state=123'
			accessToken = accessTokenMatch[1];
			let expiresIn = expiresInMatch[1];
			window.setTimeout(() => accessToken = '', expiresIn * 1000);  // wait expiresIn ms and wipe the accessToken
			window.history.pushState('Access Token', null, '/'); //wipe the URL from the history pushState(stateObj, title, url)
		} else { // do not have the token and not in  URL, so need to log in
			// redirect to the login page
			window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
			// login successfuly will redirect to localhost port 3000 with get parameters in the url
		}
			
	},
	search: async function(term) {
		const urlWithKey = 'https://api.spotify.com/v1/search?type=track&q=' + term;
		try {
			let response = await fetch(urlWithKey, {headers: {Authorization: `Bearer ${accessToken}`}});
			if (response.ok) {
				let jsonResponse = await response.json();
					console.log(jsonResponse);
					if (jsonResponse.length === 0) {// return empty array if no track
						return [];
					} else {
						return jsonResponse;
					}
			}
		} catch (error) {console.log(error);}
	}	

};

export default Spotify;