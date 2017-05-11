import React from 'react';

import UserHeader from '../components/UserHeader.jsx';

import UserContacts from '../components/UserContacts.jsx';

import ChatHeader from '../components/ChatHeader.jsx';

import ChatMessages from '../components/ChatMessages.jsx';

export default class ReactChat extends React.Component {

	constructor(props) {

		super(props);

		this.state = {

			"view" : "true"
		}
	}
	hideMe(){

		//console.log("hide my bar")

		this.setState({ "view" : "false" });

	}
	viewMe(){

		//console.log("show my bar")

		this.setState({ "view" : "true" });
	}
	hideMyChat(id){

		let data = this.props.ReactChat.chatState.activeChat;

		let result = data.map((element) => {

			if(element.id == id){

				element.view = "false";

				return element;
			}

			return element;

		});

		this.props.ReactChat.chatActions.setActiveChat(result);
	}
	ViewMyChat(id){

		let data = this.props.ReactChat.chatState.activeChat;

		let result = data.map((element) => {

			if(element.id == id){

				element.view = "true";

				return element;
			}

			return element;

		});

		this.props.ReactChat.chatActions.setActiveChat(result);

	}
	removeActiveChat(id){

		let data = this.props.ReactChat.chatState.activeChat;

		let result = data.filter((element) => {

			if(element.id != id){

				return element;
			}

		});

		this.props.ReactChat.chatActions.setActiveChat(result);
	}
	render(){

		const user = this.props.ReactChat.chatState.logIn[0];

		const users = this.props.ReactChat.chatState.users;

		const activeChats = this.props.ReactChat.chatState.activeChat;

		const { typing } = this.props.ReactChat.chatState;

		const chatWindows = activeChats.map((event) => {

			if(event){

				let isTyping = "false";

				if(typing){


					if(event.id == typing.sender){ isTyping = typing.type; }

				}
				if(event.view == "true"){

					return (

						<div key={event.id} style={{width : "300px" ,  float : "left" }}>

							<ChatHeader user={event} hideMyChat={this.hideMyChat.bind(this)}/>

							<ChatMessages messages={this.props.ReactChat.chatState.messages} user={event} logIn={user} users={users}

			sendMessage={this.props.ReactChat.chatActions.sendMessage} emoji={this.props.ReactChat.chatState.emoji} 

			typing={isTyping}

			/>

						</div>
					)	

				}
				else if(event.view == "false"){

					return(

						<div key={event.id} style={{width : "300px" ,  float : "left" }}>

							<div className="row" style={{margin : "0px" , marginTop : "410px", height : "40px" , backgroundColor : "#BDC3C7"  }}>

								<div className="row" style={{ backgroundColor : "#BDC3C7" ,   margin : "0px"}}>

									<div className="col-sm-4" >
					
										<img src={event.image} className="img-circle" width="30" height="30" style={{marginTop : "10%"}}/>
										
									</div>	

									<div className="col-sm-6" onClick={this.ViewMyChat.bind(this , event.id)}>
										
										<h4 style={{marginLeft : "0%" , marginTop : "6%"}}>{event.name}</h4>
										
									</div>

									<div className="col-sm-2" onClick={this.removeActiveChat.bind(this, event.id)}>

				<img src="https://image.flaticon.com/icons/svg/128/128397.svg" className="img-circle" width="20" height="40" />

									</div>

								</div>

							</div>		

						</div>
					)
				}
			}
		});
		return (

			<div>

				<div style={{position: "absolute" ,  top : (this.props.window.height - 450) + "px" , height: "450px" , width: "300px"}}>

					{ this.state.view == "true" ? 

					<div style={{borderLeft : "1px solid black"}}>

						<UserHeader user={this.props.ReactChat.chatState.logIn[0]} hideMe={this.hideMe.bind(this)}/>

						<UserContacts logIn={this.props.ReactChat.chatState.logIn} users={this.props.ReactChat.chatState.users}

							addActiveChat={this.props.ReactChat.chatActions.addActiveChat}/>

					</div>
 
						:

					<div style={{top : (this.props.window.height - 450) + "px" , height : "410px"}}></div>  

					}

					<div className="row" style={{height : "40px" , backgroundColor : "#BDC3C7" , margin : "0px" }}>

						<div className="col-sm-6">
							
							<img src="https://image.flaticon.com/icons/svg/265/265674.svg" className="img-circle" width="100" height="40" onClick={this.viewMe.bind(this)}/>

						</div>

						<div className="col-sm-6" >
							
							<img src="https://image.flaticon.com/icons/svg/265/265666.svg" className="img-circle" width="100" height="40" />

						</div>

					</div>

				</div>

				<div style={{

						top : (this.props.window.height - 450) + "px" , 

						width : (this.props.window.width - 300) + "px" ,

						position: "absolute",

						height: "450px",

						left: "300px"

					}}>

					{ chatWindows } 

				</div>

			</div>	

		)
	}
}