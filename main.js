const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

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
			console.log(app.getPath('userData'));
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

function releaseWindowWhenClosed(targetWindow) {
	targetWindow && targetWindow.on('close', () => targetWindow = null);
}
