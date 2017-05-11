import { combineReducers } from 'redux';

import { SET_MY_LOGIN , SET_MY_USERS  , ADD_TO_ACTIVE_CHAT , SET_MY_MESSAGE , 

	SET_TO_ACTIVE_CHAT , ADD_TO_LATER_CHAT , SEND_MESSAGE , SET_MY_EMOJI , TYPING} from '../constants/ActionTypes';

const initialState = {

	logIn : [
		/*{
      "id": 1,
      "name": "Ashik",
      "username": "ashik",
      "status": "Available",
      "password": "123",
      "image": "https://scontent.fmaa1-1.fna.fbcdn.net/v/t1.0-9/16472812_392562381092382_2620133568589557554_n.jpg?oh=c3d6b1a1510a03a96b239e8086e27350&oe=596616AC"
    }*/
		
	],

	users : [],

	messages : [],

	activeChat : [],

	laterChat : [],

	emoji : [],

	typing : null

};

function myApplicationState (state = initialState, action){

	switch (action.type) {

		case SET_MY_USERS :

			return Object.assign({},state,{ users : action.responce  });	

		case SET_MY_LOGIN :

			return Object.assign({},state,{ logIn : action.responce  });

		case SET_MY_MESSAGE :

			return Object.assign({},state,{ messages : action.responce  });	

		case ADD_TO_ACTIVE_CHAT :

			return Object.assign({},state,{ activeChat : [action.responce , ...state.activeChat]  });	

		case SET_TO_ACTIVE_CHAT :

			return Object.assign({},state,{ activeChat : action.responce  });

		case ADD_TO_LATER_CHAT :

			return Object.assign({},state,{ laterChat : [action.responce , ...state.laterChat]  });		

		case SEND_MESSAGE :

			return Object.assign({},state,{ messages : [...state.messages , action.responce]  });	

		case TYPING :

			return Object.assign({},state,{ typing :  action.responce  });			

		case SET_MY_EMOJI :

			return Object.assign({},state,{ emoji : action.responce  });

		default:

    		return state;	
	}

};

const rootReducer = combineReducers( { myApplicationState }  )
 
export default rootReducer
