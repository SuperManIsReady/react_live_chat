import React from 'react'; 

export default class UserContacts extends React.Component {

	constructor(props) {

		super(props);

		this.addToActiveChat = this.addToActiveChat.bind(this);

	}

	addToActiveChat(event){

		let { users } = this.props;

		let id = event.target.id;

		let chat = users.filter((element) => {

			if(id == element.id){

				element.view = "true";

				return element;
			}
		});

		this.props.addActiveChat(chat[0]);
	}

	render(){

		let { logIn } = this.props;

		let { users } = this.props;

		let result = users.map((element) => {

			if(element.id == logIn[0].id){ 

				return <div key={element.id}></div>
			}
			else{

				return (

					<div className="row" key={element.id}>

						<div className="col-sm-4" >

							<img src={element.image} className="img-circle" width="45" height="45" style={{margin : "20%"}}/>

						</div>

						<div className="col-sm-8" id={element.id} onClick={this.addToActiveChat}>

							<h4 style={{marginTop : "10%"}} id={element.id}>{element.name}</h4>

							<h6 id={element.id}>{element.status}</h6>

						</div>

					</div>

				)	
			}	

		});

		return(

			<div style={{ postion : "absolute", width : "300px" , height : "335px" , overflowY : "auto" ,  overflowX : "hidden" , backgroundColor : "#F8F9F9"}}>

				{ result }

			</div>
		)
	}
}