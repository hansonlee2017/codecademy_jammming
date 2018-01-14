import React from 'react';
import './PlayList.css';
import TrackList from '../TrackList/TrackList.js';

class PlayList extends React.Component {
	constructor(props) {
		super(props);
		this.handleNameChange = this.handleNameChange.bind(this);
	}
	
	
	handleNameChange(event) { //get event.target.value from event
		this.props.onNameChange(event.target.value);
	}
	
	
	render() {
		return (
			<div className="Playlist">
			  <input defaultValue={'New Playlist'} onChange={this.handleNameChange}/>
			  <TrackList trackList={this.props.playList} isRemoval={true} onRemove={this.props.onRemove}/>
			  <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
			</div>
		);
	}
}

export default PlayList;