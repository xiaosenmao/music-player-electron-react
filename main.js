const path = require('path');
const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer');


const MusicStore = require('./src/utils/MusicStore');
const store = new MusicStore({ name: 'Music Data' });

class AppWindow extends BrowserWindow {
	static basicConfig = {
		width: 800,
		height: 600,
		webPreference: {
			nodeIntegration: true
		},
		show: false,
		backgroundColor: '#efefef'
	};

	constructor(config, urlLocation) {
		const mergedConfig = { ...AppWindow.basicConfig, ...config };
		super(mergedConfig);

		this.loadURL(urlLocation).then(() => {
			console.log('------------------------------', app.getPath('userData'));
		});
		this.once('ready-to-show', () => {
			this.show();
		});
	}
}

app.on('ready', () => {
	const urlLocation = isDev ? 'http://localhost:8080' : `file://${path.join(__dirname, './dist/index.html')}`;

	const mainWindow = new AppWindow({ width: 1024, height: 680 }, urlLocation);
	if (isDev) mainWindow.openDevTools();
	releaseWindowWhenClosed(mainWindow);
});

if (process.env.NODE_ENV === 'development') {
	app.on('ready', () => {
		[ REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS ].forEach(extension => {
      installExtension(extension)
        .then(name => console.log(`Added Extension: ${name}`))
        .catch(err => console.log('An error occurred: ', err));
    });
	});
}

function releaseWindowWhenClosed(targetWindow) {
	targetWindow && targetWindow.on('close', () => targetWindow = null);
}
