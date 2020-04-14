const Store = require('electron-store');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

class MusicStore extends Store {
	constructor(settings) {
		super(settings);

		this.tracks = this.get('tracks') || [];
	}

	_saveTracks() {
		this.set('tracks', this.tracks);
		return this;
	}

	getTracks() {
		return this.get('tracks') || [];
	}

	addTracks(tracks) {
		const tracksWithProps = tracks.map(track => {
			return {
				id: uuidv4(),
				path: track,
				fileName: path.basename(track)
			};
		})
		.filter(track => {
			const savedTrackPaths = this.getTracks().map(t => t.path);
			return !savedTrackPaths.includes(track.path);
		});

		this.tracks = [ ...this.tracks, ...tracksWithProps ];
		return this.saveTracks();
	}

	deleteTracks(id) {
		this.tracks = this.tracks.filter(t => t.id !== id);
		return this._saveTracks();
	}
}

module.exports = MusicStore;
