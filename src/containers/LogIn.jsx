import React from 'react';

export default class LogIn extends React.Component {

	constructor(props) {

		super(props);

		this.state = {

			username : '',

			password : ''

		};

		this.handleChangeUserName = this.handleChangeUserName.bind(this);

		this.handleChangePassword = this.handleChangePassword.bind(this);

		this.handleSubmit = this.handleSubmit.bind(this);
		
	}

	handleChangeUserName(event) {

		this.setState({username: event.target.value});

	}

	handleChangePassword(event) {

		this.setState({password: event.target.value});

	}

	handleSubmit(event) {

		let users = this.props.users;

		let logInUser = users.filter((element) => {

			if(element.username === this.state.username && element.password === this.state.password){

				return element;

			}else{

				this.setState({

					username: "",

					password : ""

				});	
			}

		});

		this.props.logIn(logInUser)

	}

	render(){

		return(

			<div className="container-fulid" style={{ height : "inherit" , overFlowX : "hidden"}}>


				<div className="row" style={{ marginTop : "15%"}}>

					<div className="col-sm-4"></div>

					<div className="col-sm-4">
						
						<form>

							<div className="form-group">

								<label htmlFor="username">User Name:</label>

								<input type="text" className="form-control" id="username" value={this.state.username} onChange={this.handleChangeUserName}/>

							</div>

							<div className="form-group">

								<label htmlFor="password">Password:</label>

								<input type="password" className="form-control"  htmlFor="inputError" id="password" value={this.state.password} onChange={this.handleChangePassword} />
								
							</div>

							<button type="button" className="btn btn-default" onClick={this.handleSubmit}>Submit</button>

						</form>

					</div>

					<div className="col-sm-4">
						

					</div>

				</div>

			</div>	

		)
	}
}