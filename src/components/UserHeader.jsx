import React from 'react';

export default class UserHeader extends React.Component {

	constructor(props) {

		super(props);		
	}
	
	render(){

		let { user } = this.props;

		return(

			<div className="row" style={{ backgroundColor : "#BDC3C7" , width : "300px" , height : "75px" ,  margin : "0px"}}>

				<div className="col-sm-4" >
					
					<img src={user.image} className="img-circle" width="50" height="50" style={{margin : "15%"}}/>
					
				</div>	

				<div className="col-sm-4">
					
					<h3 style={{marginLeft : "5%" , marginTop : "20%"}}>{user.name}</h3>

					<h6 style={{marginLeft : "5%"}}>{user.status}</h6>
					
				</div>

				<div className="col-sm-4" onClick={this.props.hideMe.bind(this)}>
					
<img src="https://image.flaticon.com/icons/svg/3/3897.svg" width="55" height="15" style={{marginTop : "10%" , marginLeft : "40%"}}/>
					
				</div>						
				
			</div>	
		)
	}
}