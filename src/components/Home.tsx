import * as React from 'react';
import './Home.scss';


interface MusicItem {
	id: string;
	path: string;
	name: string;
}

interface HomeState {
	list: MusicItem[]
}

export default class Home extends React.Component<any, HomeState> {
	constructor(props: any) {
		super(props);

		this.state = {
			list: [
				{id: '0', path: '', name: '郑中基 - 美女与野兽.mp3'},
				{id: '1', path: '', name: '郑中基 - 美女与野兽.mp3'}
			]
		};
	}

	render() {
		return (
			<div className='home'>
				<h2>播放器</h2>
				<div className='add'>添加歌曲到曲库</div>
				{this.renderList()}
			</div>
		);
	}

	private renderList() {
		const { list } = this.state;
		if (!list || list.length < 1) return false;

		return (
			<ul>
				{
					list.map(m => {
						return (
							<li key={m.id} className='item'>
								<div className='info'>
									<i className="iconfont iconmusic1"></i>
									<b>{m.name}</b>
								</div>
								<div className='action'>
									<i className="btn iconfont iconplay"></i>
									<i className="btn iconfont icondelete"></i>
								</div>
							</li>
						);
					})
				}
			</ul>
		);
	}
}
