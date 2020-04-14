import * as React from 'react';
import Home from './components/Home';

import './reset.scss';
import './App.scss';

export default class App extends React.Component<{}, {}> {
	render() {
		return (
			<div className='app'>
				<Home />
			</div>
		);
	}
}
