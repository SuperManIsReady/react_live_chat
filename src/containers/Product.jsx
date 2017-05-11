import React from 'react';

import LogIn from './LogIn.jsx';

import ReactChat from './ReactChat.jsx';

import * as WebSocketHandler  from '../socketServer/websocket'

export default class Product extends React.Component {

	constructor(props) {

		super(props);

		this.state = {

			"height" : "" , 

			"width" :  "",

			"activeLength" : ""
		}
		this.myWindow = this.myWindow.bind(this);
	}
	myWindow(){

		const { activeChat } = this.props.chatState;

		const { laterChat } = this.props.chatState;

		const width = window.innerWidth-400;

		const len = Math.floor(width/300);

		if(activeChat.length > len){

			const item = activeChat.splice(activeChat.length - 1 , 1);

			if(item[0]){

				this.props.chatActions.addLaterChat(item[0]);
			}	
		}
		else if(activeChat.length < len){

			let item = laterChat.splice(0, 1);

			if(item[0]){

				this.props.chatActions.addActiveChat(item[0]);
			}	

		}

		this.setState({

			"height" : window.innerHeight , 

			"width" :  window.innerWidth , 

			"activeLength" : len
		});
	}

	componentDidUpdate(prevProps, prevState){

		if(this.props != prevProps){

			if(this.props.chatState.messages != prevProps.chatState.messages){

	const data = (this.props.chatState.messages).slice(this.props.chatState.messages.length - 1, this.props.chatState.messages.length);

				const { logIn } = this.props.chatState;

				const { users } = this.props.chatState;

				const recever = users.filter((event) => {

					if(event.id == data[0].recever){

						return event
					}
				});

				if(logIn[0]){

					if(recever[0].id == logIn[0].id){

						const sender = users.filter((event) => {

							if(event.id == data[0].sender){

								return event
							}

						});

						sender[0].view = "true";

						this.props.chatActions.addActiveChat(sender[0]);
					}
				}				
			}

			this.myWindow();
		}	
	}

	componentDidMount() {

		WebSocketHandler.init.bind(this).call();

		this.props.chatActions.setMyUser();

		this.props.chatActions.setMessage();

		this.props.chatActions.setEmoji();

		this.myWindow();

		window.addEventListener("resize", this.myWindow);

	}

	componentWillUnmount(){

		window.removeEventListener("resize", this.myWindow);
	}

	render(){

		return(	

			this.props.chatState.logIn.length == 0 ? 

			<LogIn logIn={this.props.chatActions.setMyLogin} users={this.props.chatState.users}/>  

				:

			this.state.height > 500 && this.state.width > 800 ? 

				<div>

					<ReactChat ReactChat={this.props} window={this.state}/>
					
				</div>	

					: 

				<div><h1>Plzz Adjust Your Window</h1></div>				
		)
	}
}		