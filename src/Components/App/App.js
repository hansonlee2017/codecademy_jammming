import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import PlayList from '../PlayList/PlayList.js';
import Spotify from '../../util/Spotify.js';

let songtrack = {
	uri: 'spotify:123',
	id: '123',
	name: 'ABC',
	artist: 'XYZ',
	album: 'ABC by XYZ',
};

let songtrack1 = {
	uri: 'spotify:456',
	id: '456',
	name: 'ABC in PlayList',
	artist: 'XYZ',
	album: 'ABC by XYZ in PlayList',
};

let songtrack2 = {
	uri: 'spotify:789',
	id: '789',
	name: 'ABC in PlayList',
	artist: 'XYZ',
	album: 'ABC by XYZ in PlayList',
};




class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {searchResults: [],
					  playList:      [],
					  playListName: ''};
		this.addTrack = this.addTrack.bind(this); // bind this to App instance
		this.removeTrack = this.removeTrack.bind(this); //bind this to App instance
		this.updatePlaylistName = this.updatePlaylistName.bind(this);
		this.savePlaylist = this.savePlaylist.bind(this);
		this.search = this.search.bind(this);
	}
	
	addTrack(track) {		
		// Check if track id not in playlist track
		
		function checkTrackId(trackInPlayList) {
			return track.id !== trackInPlayList.id;
		}	
	
		if (this.state.playList.every(checkTrackId)) { // pass all checks
			// state array is immutable, so need to use concat (return a new array) instead of push
			this.setState({playList: this.state.playList.concat(track)}); 
		}
	}
	
	removeTrack(track) {
		let newPlayList = this.state.playList.slice() // make a shallow copy
		
		function checkTrackId(trackInPlayList) {
			return track.id !== trackInPlayList.id;
		}
		
		this.setState({playList: newPlayList.filter(checkTrackId)}); //filter out anything that matches the track id
	}
	
	updatePlaylistName(newPlayListName) { 
		this.setState({playListName: newPlayListName})
	}
	
	savePlaylist() {
		let trackURIs = this.state.playList.map(track => track.uri);
	}
	
	search(term) {
		console.log(term);
		Spotify.getAccessToken();
		this.setState({searchResults: Spotify.search(term)});
	}
	
	
	render() {
		return (
			<div>
			  <h1>Ja<span className="highlight">mmm</span>ing</h1>
			  <div className="App">
				<SearchBar onSearch={this.search}/>
				<div className="App-playlist">
				  <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
				  <PlayList playList={this.state.playList} 
				            onRemove={this.removeTrack} 
							onNameChange={this.updatePlaylistName}
							onSave={this.savePlaylist}/>
				</div>
			  </div>
			</div>
		
		);
	}
}

export default App;


