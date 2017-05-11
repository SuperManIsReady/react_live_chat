import React from 'react';

export default class ChatHeader extends React.Component {

	constructor(props) {

		super(props);
		
	}

	render(){

		return(

	<div className="row" style={{ backgroundColor : "#BDC3C7" , position : "fixed" , width : "315px" , height : "75px" }}> 

				<div className="col-sm-4" >
					
					<img src={this.props.user.image} className="img-circle" width="45" height="45" style={{margin : "20%"}}/>
					
				</div>	

				<div className="col-sm-4">
					
					<h4 style={{marginLeft : "10%" , marginTop : "20%"}}>{this.props.user.username}</h4>

					<h6 style={{marginLeft : "10%"}}>{this.props.user.status}</h6>
					
				</div>

				<div className="col-sm-4" onClick={this.props.hideMyChat.bind(this, this.props.user.id)}>
					
<img src="https://image.flaticon.com/icons/svg/3/3897.svg" width="55" height="15" style={{marginTop : "10%" , marginLeft : "50%"}}/>
					
				</div>						
				
			</div>	

		)
	}
}