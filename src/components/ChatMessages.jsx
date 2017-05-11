import React from 'react';

import { userChat } from "../actions/MyActions";

import * as WebSocketHandler  from '../socketServer/websocket'

export default class ChatMessages extends React.Component {

	constructor(props) {

		super(props);

		this.state = {

			"search" : "",

			"itSearch" : "false",

			"userArray" : [],

			"isEmoji" : "false",

			"emoji" : [],

			"mensionUserId" : null,

			"mensionUserElement" : null,

			"isSlash" : "false",

			"slashView" : null,

			"slashArray" : [

				{ "name" : "users" , "selected" : "true" }, 

				{ "name" : "tickets" , "selected" : "false" } ,

				{ "name" : "branch" , "selected" : "false" } ,

				{ "name" : "employee" , "selected" : "false" }

			]
		}	

		this.chatKeyDown = this.chatKeyDown.bind(this);

		this.chatKeyUp = this.chatKeyUp.bind(this);

		this.findMentionNode = this.findMentionNode.bind(this);

		this.addEmoji = this.addEmoji.bind(this);

		this.addMension = this.addMension.bind(this);

		this.getId = this.getId.bind(this);

		this.userHovor = this.userHovor.bind(this)

	}
	userHovor(event){

		var elm = event.target;

		if(elm.classList.contains("MentionsSpan")){

			this.setState((state)=>{

				if(state.mensionUserId){

					return {mensionUserId:null}

				}else{

					return {mensionUserId:elm.getAttribute("data-mensionUserId") , mensionUserElement : elm }
				}
			});
		}
	}
	findMentionNode(list, zuid){
		
		for(let i=0,_len = list.length;i<_len;i++){
		
			if(list[i].childNodes && list[i].childNodes.length > 1){

				return this.findMentionNode(list[i].childNodes , zuid);
			}
			if(list[i].id == zuid){

				return list[i+1];
			}
		}
    }
    getId(){

    	let date = new Date();

		let time = date.getTime();

		return time * Math.floor(Math.random() * 10);
    }
    addMension(event){

    	const { userArray } = this.state;

    	const user =  userArray.filter((element) => {

			if(element.id == event.target.id){ return element }
		});

		let content = this.refs.chatContentEditable.innerHTML;

		let id = this.getId();

		let patten;

		if(this.state.search == ""){

			patten = /@/g
		}
		else{

			patten = "@"+this.state.search;
		}

content = content.replace(patten, "<span class='MentionsSpan' contentEditable='false' id='"+id+"' data-mensionUserId='"+user[0].id+"'>"+user[0].name+"</span>&nbsp");

		this.refs.chatContentEditable.innerHTML = content;	

		let childs = this.refs.chatContentEditable.childNodes;

		let focusedDom = this.findMentionNode(childs, id);	

		if(focusedDom){

			var range = document.createRange();

			var sel = window.getSelection();

			range.setStart(focusedDom, 1);

			range.collapse(false);

			sel.removeAllRanges();

			sel.addRange(range);			
		}
		this.setState({ 

				"userArray" : [] ,

				"emoji" : [],

				"isEmoji" : "false",	

				"itSearch" : "false"

		});
	}
	addEmoji(event){

		const { emoji } = this.state;

		const smiley = emoji.filter((event) => {

			if(event.key == event.target.id){ return event }
		});

		let content = this.refs.chatContentEditable.innerHTML;

		let id = this.getId();

content = content.replace(/:/g, "<img src='/public/png/"+smiley[0].fileName+"' id='"+id+"'class='img-rounded' alt='Cinque Terre' width='23' height='23'/>&nbsp");
			
		this.refs.chatContentEditable.innerHTML = content;	

		let childs = this.refs.chatContentEditable.childNodes;

		let focusedDom = this.findMentionNode(childs, id);	

		if(focusedDom){

			var range = document.createRange();

			var sel = window.getSelection();

			range.setStart(focusedDom, 1);

			range.collapse(false);

			sel.removeAllRanges();

			sel.addRange(range);
			
		}
		this.setState({ 

				"userArray" : [] ,

				"emoji" : [],

				"isEmoji" : "false",	

				"itSearch" : "false"

		});
	}
	chatKeyDown(event){		

		let type = {

			"sender" : this.props.logIn.id ,

			"recever" : this.props.user.id ,

			"type" : "true"
		}

		this.setState({ "mensionUserId" : null, "mensionUserElement" : null })

		if(event.keyCode === 50){			

  			const { users } = this.props;

			users[0].selected = "true";

			this.setState({ 

				"userArray" : users ,

				"itSearch" : "true"

			});
  		}

  		else if(event.keyCode === 27){

  			this.setState({ 

				"userArray" : [] ,

				"isEmoji" : "false",	

				"itSearch" : "false",

				"isSlash" : "false"

			});
  		}
  		else if(event.keyCode == 40){

			if(this.state.itSearch == "true" || this.state.isEmoji == "true" || this.state.isSlash == "true"){

				let parentNode;

				let select;

				let nonSelect;

				let scrollDiv;

				if(this.state.itSearch == "true"){ 

					parentNode = this.refs.myMensions; 

					select = "select";

					nonSelect = "nonSelect"

					scrollDiv = parentNode					

				}
				
				else if(this.state.isEmoji == "true"){  

					parentNode = this.refs.myEmoji; 

					select = "emojiSelect"

					nonSelect = "emojiNonSelect"

					scrollDiv = this.refs.myEmojiScroll
				}

				else if(this.state.isSlash == "true"){  

					parentNode = this.refs.MySlash; 

					select = "select"

					nonSelect = "nonSelect"

					scrollDiv = parentNode;
				}

				let childNodes = parentNode.childNodes;

				let currectSelected;

				for(let i = 0; i < childNodes.length; i++){

					if(childNodes[i].id == select){

						currectSelected = childNodes[i]
					}
				}

				if(currectSelected.nextSibling){					

					scrollDiv.scrollTop  = (currectSelected.nextSibling.offsetTop - 200);

					currectSelected.nextSibling.id = select;

					currectSelected.id = nonSelect;

				}
			}
		}
		else if(event.keyCode == 38){

			if(this.state.itSearch == "true" || this.state.isEmoji == "true" || this.state.isSlash == "true"){

				let parentNode;

				let select;

				let nonSelect;

				let scrollDiv;

				if(this.state.itSearch == "true"){ 

					parentNode = this.refs.myMensions; 

					select = "select";

					nonSelect = "nonSelect"

					scrollDiv = parentNode

				}				

				else if(this.state.isSlash == "true"){  

					parentNode = this.refs.MySlash; 

					select = "select"

					nonSelect = "nonSelect"

					scrollDiv = parentNode;
				}

				else if(this.state.isEmoji == "true"){  

					parentNode = this.refs.myEmoji; 

					select = "emojiSelect"

					nonSelect = "emojiNonSelect"

					scrollDiv = this.refs.myEmojiScroll
				}

				let childNodes = parentNode.childNodes;

				let currectSelected;

				for(let i = 0; i < childNodes.length; i++){

					if(childNodes[i].id == select){

						currectSelected = childNodes[i]
					}
				}

				if(currectSelected.previousSibling){

					scrollDiv.scrollTop  = +(currectSelected.previousSibling.offsetTop - 200);

					currectSelected.previousSibling.id = select;

					currectSelected.id = nonSelect;

				}
			}
		}
		else if(event.keyCode == 13){

  			event.preventDefault();			

			if(this.state.itSearch == "true" || this.state.isEmoji == "true" || this.state.isSlash == "true"){

				let parentNode;

				let select;

				let nonSelect;

				let userArray;

				if(this.state.itSearch == "true"){ 

					parentNode = this.refs.myMensions; 

					select = "select";

					nonSelect = "nonSelect"

					userArray = this.state.userArray;

				}
				
				else if(this.state.isEmoji == "true"){  

					parentNode = this.refs.myEmoji; 

					select = "emojiSelect"

					nonSelect = "emojiNonSelect"

					userArray = this.state.emoji;

				}

				else if(this.state.isSlash == "true"){  

					parentNode = this.refs.MySlash; 

					select = "select"

					nonSelect = "nonSelect"

					userArray = this.state.slashArray;
				}

				let childNodes = parentNode.childNodes;

				let currectSelected;

				for(let i = 0; i < childNodes.length; i++){

					if(childNodes[i].id == select){

						currectSelected = childNodes[i]
					}
				}

				const myElement = userArray.filter((element) => {

					let key;

					if(this.state.itSearch == "true"){ key = element.id }

					else if(this.state.isEmoji == "true"){ key = element.key }

					else if(this.state.isSlash == "true"){ key = element.name }

					if(currectSelected.childNodes[0].id == key){	

						return element;
					}
				});

				let content = event.target.innerHTML;

				const uniqId = this.getId();

				if(this.state.itSearch == "true"){	

					let patten;

					if(this.state.search == ""){

						patten = /@/g
					}
					else{

						patten = "@"+this.state.search;
					}

content = content.replace(patten, "<span class='MentionsSpan' contentEditable='false' id='"+uniqId+"' data-mensionUserId='"+myElement[0].id+"'>"+myElement[0].name+"</span>&nbsp");

				}

				else if(this.state.isEmoji == "true"){

content = content.replace(/:/g, "<img src='/public/png/"+myElement[0].fileName+"' id='"+uniqId+"'class='img-rounded' alt='Cinque Terre' width='23' height='23' />&nbsp");

				}

				else if(this.state.isSlash == "true"){

				content = "<span class='MentionsSpan' id='"+uniqId+"'>/"+myElement[0].name+"</span class='MentionsSpan'>&nbsp";

				}
			
				event.target.innerHTML = content;			

				let childs = event.target.childNodes;

				let focusedDom = this.findMentionNode(childs, uniqId);

				if(focusedDom){

					var range = document.createRange();

					var sel = window.getSelection();

					range.setStart(focusedDom, 1);

					range.collapse(false);

					sel.removeAllRanges();

					sel.addRange(range);
					
				}
this.setState({"search" : "" , "itSearch" : "false" , "userArray" : [], 

	"isEmoji" : "false" , "emoji" : [] , "isSlash" : "false" , "slashView" : { "key" : myElement[0].name , "value" : "" } });

				return
			}

			else if(this.state.slashView != null){

				let data = event.target.innerHTML;

				console.log(data)
			}

			type.type = "false"

			WebSocketHandler.send(JSON.stringify(type));

			let chat = {

				"sender" : this.props.logIn.id ,

				"recever" : this.props.user.id ,

				"content" : event.target.innerHTML
			}

			
			if(event.target.innerHTML != ""){

				setTimeout(()=>{

					WebSocketHandler.send(JSON.stringify(chat));

				} , 50);	

				this.props.sendMessage(chat);

				this.refs.chatContentEditable.innerHTML = "";

				this.setState({ "search" : "" , "itSearch" : "false" , "userArray" : [] } , () => { 

					let div = this.refs.chatContent;

					div.scrollTop = div.scrollHeight - div.clientHeight; 

				});
			}
		}

		else if(event.keyCode == 186){

			let { emoji } = this.props;

			emoji[0].selected = "true";

			this.setState({"search" : "" , "itSearch" : "false" , "userArray" : [] , "isEmoji" : "true" , "emoji" : emoji});
		}

		else if(event.keyCode == 191){

	this.setState({"search" : "" , "itSearch" : "false" , "userArray" : [] , "isEmoji" : "false" , "emoji" : [] , "isSlash" : "true"});

		}

		WebSocketHandler.send(JSON.stringify(type));

		setTimeout(()=>{

			type.type = "false"

			WebSocketHandler.send(JSON.stringify(type));

		}, 3000);
	}

	chatKeyUp(event){

		if(this.state.itSearch == "true"){

			let positionOne = event.target.innerHTML.indexOf("@");

			let positionTwo = event.target.innerHTML.slice(positionOne , event.target.innerHTML.length).indexOf("&nbsp;");

			if(positionTwo != -1){

				this.setState({"search" : event.target.innerHTML.slice(positionOne + 1 , positionOne+positionTwo) });
			}
			else{

				this.setState({"search" : event.target.innerHTML.slice(positionOne + 1 , event.target.innerHTML.length) });
			}	
		}
	}
	componentDidUpdate(prevProps){

		if(this.props != prevProps){

			let div = this.refs.chatContent;
			
			if(div.scrollHeight > div.clientHeight){

				div.scrollTop = div.scrollHeight - div.clientHeight;			
			}
		}	
	}
	componentDidMount() {

		let div = this.refs.chatContent;

		div.scrollTop = div.scrollHeight - div.clientHeight;
	}
	render(){

		const { typing } = this.props;

		const { messages } = this.props;

		const { logIn } = this.props;

		const { user } = this.props;

		let chat;

		if(messages){

			chat = messages.map((event , count) =>{

				if(logIn.id == event.sender && user.id == event.recever || logIn.id == event.recever && user.id == event.sender){			

					return (

						<div  key={count} >

							<div className="row" >

								<div className="col-sm-2" >
							
	<img src={event.sender == logIn.id ? logIn.image : user.image} 

		className="img-circle" width="25" height="25" style={{marginTop : "5%"}}/>
									
								</div>

								<div className="col-sm-6">

	<b><h4 id={event.sender == logIn.id ? logIn.id : user.id} style={{margin : "0%", marginTop : "7%"}}>

				{event.sender == logIn.id ? logIn.username : user.username}</h4></b>

								</div>

								<div className="col-sm-4">

									<h6>{event.time}</h6>

								</div>

							</div>

	<div style={{marginLeft : "3%" , marginTop : "5%"}} dangerouslySetInnerHTML={{__html:event.content}} onClick={this.userHovor}>				

							</div><br/>

						</div>

					)
				}
			});	
		}


		let { userArray } = this.state;

		const { search } = this.state;

		let mensions;

		let filteduserArray

		if(userArray.length > 0){

			if(search != ""){

				filteduserArray =  userArray.filter((event) =>{

					if(((event.name).toLowerCase()).includes((search).toLowerCase())){

						return event
					}

				});

				userArray = filteduserArray;
			}			

			mensions = userArray.map((event) => {

				return (

					<div className="row" id={event.selected == "true"? "select" : "nonSelect"} style={{ 

		 backgroundColor : "#BDC3C0" , margin : "0px" , marginLeft : "25px" , width : "250px" , borderBottom : "1px solid black" ,

		overflow : "hidden" , height : "50px" }} key={event.id} > 

						<div className="col-sm-4" id={event.id}>

							<img src={event.image} className="img-circle" width="25" height="25" style={{margin : "20%"}}/>

						</div>	

						<div className="col-sm-4" id={event.id} onClick={this.addMension} >

							<h4 style={{marginLeft : "10%" , marginTop : "20%"}} id={event.id}>{event.name}</h4>				

						</div>										

					</div>	
				)

			});
		}

		const { isEmoji } = this.state;

		const { emoji } = this.state;

		let emojiContent;

		if(isEmoji == "true"){

			emojiContent = emoji.map((event , key) => {

					const png = "/public/png/"+event.fileName;

					return (

						<div className="col-sm-6" key={key} id={event.selected == "true"? "emojiSelect" : "emojiNonSelect"}>

							<div className="row" id={event.key} onClick={this.addEmoji}>

								<div className="col-sm-4">

	<img src={png} className='img-rounded' alt='Cinque Terre' width='25' height='25' style={{margin : "10px"}} id={key} />
								
								</div>

								<div className="col-sm-4" style={{marginTop :"8%"}} id={event.key}>

									{event.name}

								</div>

							</div>

						</div>
					)
			});
		}

		const { mensionUserId } = this.state;

		const { users } = this.props

		let mensionUser = [];

		if(mensionUserId != null){

			mensionUser = users.filter((event) => {

				if(event.id == mensionUserId){

					return event;
				}
			});	
		}

		const { isSlash } = this.state;

		const { slashArray } = this.state;

		let slashList;

		if(isSlash == "true"){

			slashList = slashArray.map((event , key) => {

				return(

					<div style={{margin : "3px" , borderBottom : "1px solid black" , textAlign : "center"}} key={key} 

					id={event.selected == "true"? "select" : "nonSelect"}>

						<h4 id={event.name}>{event.name}</h4>

					</div>	
				)	

			});

		}

		const { slashView } = this.state;

		if(slashView == "users"){
			
		}

		console.log(slashView);

		return (

			<div style={{backgroundColor : "#F8F9F9" , margin : "0px" ,	width : "300px" , marginTop :"75px" , 

			height : "375px" , borderRight : "1px solid black" }}>

				<div style={{margin : "0px" , height : "300px" , overflow : "auto" , overflowX : "hidden" , position : "relative"}}  ref="chatContent" id="chatContent"> 

					{ chat }

					{ this.state.userArray.length > 0 &&

	<div ref="myMensions" style={{ position : "fixed" , bottom : "75px" , maxHeight : "250px" , overflow : "auto"  }} >
				
			{ mensions }

	</div>
					}
					{ this.state.isSlash == "true" &&

	<div ref="mySlashList" style={{ position : "fixed" , width : "298px" ,bottom : "75px" , maxHeight : "250px" , 

			overflow : "auto" ,  overflowX : "hidden" , backgroundColor : "#BDC3C0"  }} ref="MySlash">
				
			{ slashList }

	</div>

					}

					{ isEmoji == "true" && 

	<div ref="myEmojiScroll" style={{ position : "fixed" , width : "298px" ,bottom : "75px" , maxHeight : "250px" , 

overflow : "auto" ,  overflowX : "hidden" , backgroundColor : "#FFFFFF"}}>
						
						<div className="row"  ref="myEmoji">

							{ emojiContent }

						</div>	

	</div>
					}

{mensionUser[0] &&  <Mensions mensionUser={mensionUser[0]}  mensionUserElement={this.state.mensionUserElement} parent={this.refs.chatContent}/>	}

				</div>	

				{typing == "true" && 

					<div style={{ position : "fixed" ,bottom : "75px", backgroundColor : "#FFF5FF"}}>

						<h5>typing....</h5>

					</div>	
				}

				<div contentEditable={true} onKeyDown={this.chatKeyDown} onKeyUp={this.chatKeyUp} 

				style={{margin : "5px" , height : "55px" ,  border : "1px solid black" , overflow : "auto"}}

				 ref="chatContentEditable" >

				</div>

				

			</div>
		)
	}
}

class Mensions extends React.Component {

	constructor(props) {

		super(props);
		
	}

	render(){

		return(

			<div style={{ height : "280px", width : "200px"  , backgroundColor : "#F8F9F9" , position : "absolute", 

		border : "1px solid black" , top : this.props.parent.scrollTop, left : this.props.mensionUserElement.offsetLeft , zIndex : 1 }}>
							
				<div style={{height : "150px", width : "200px" }} id={this.props.mensionUser.id}>

					<img src={this.props.mensionUser.image} width="200px"  height="150px" />

				</div>	

				<div style={{height : "100px", width : "200px" , textAlign : "center"}} id={this.props.mensionUser.id}>

					<h3>{this.props.mensionUser.name}</h3>

					<h5>({this.props.mensionUser.username})</h5>

					<h4>{this.props.mensionUser.status}</h4>

				</div>

			</div>
		)

	}
}