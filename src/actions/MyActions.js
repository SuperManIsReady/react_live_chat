
import { SET_MY_LOGIN , SET_MY_USERS , ADD_TO_ACTIVE_CHAT , SET_MY_MESSAGE , 

	SET_TO_ACTIVE_CHAT , ADD_TO_LATER_CHAT , SEND_MESSAGE , SET_MY_EMOJI , TYPING} from '../constants/ActionTypes';

export const setMyLogin = responce => ({ type: SET_MY_LOGIN, responce });

const setMyUserDispatch = responce => ({ type: SET_MY_USERS, responce });

export const setMyUser = () => {

	return (dispatch)=>{

		const httpRequests = new XMLHttpRequest();

		httpRequests.onload = () => {	    	

			if (httpRequests.status === 200) {

				const data = JSON.parse(httpRequests.response);

				dispatch(setMyUserDispatch(data));

			} else {

				console.log("Ajax is Failure On Get Data From errorMessages")

				dispatch(errorMessage("error"));
			}
		}

		httpRequests.onerrorMessage = () => {	

				console.log("Network errorMessage");

				dispatch(errorMessage("Network errorMessage"));
		};	

		httpRequests.open('GET', "http://ashik-zuch560:3000/users" );

		httpRequests.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

		httpRequests.send();               	

	};
};

const setMessageDispatch = responce => ({ type: SET_MY_MESSAGE, responce });

export const setMessage = () => {

	return (dispatch)=>{

		const httpRequests = new XMLHttpRequest();

		httpRequests.onload = () => {	    	

			if (httpRequests.status === 200) {

				const data = JSON.parse(httpRequests.response);

				dispatch(setMessageDispatch(data));

			} else {

				console.log("Ajax is Failure On Get Data From errorMessages")

				dispatch(errorMessage("error"));
			}
		}

		httpRequests.onerrorMessage = () => {	

				console.log("Network errorMessage");

				dispatch(errorMessage("Network errorMessage"));
		};	

		httpRequests.open('GET', "http://ashik-zuch560:3000/messages" );

		httpRequests.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

		httpRequests.send();               		

	};
};

const addActiveChatDispatch = responce => ({ type: ADD_TO_ACTIVE_CHAT, responce });

export const addActiveChat = (data) => {
	
	return (dispatch , getState)=>{

		const { activeChat } = getState().myApplicationState;

		let filterActiveChat = activeChat.filter((element) => {

			if(element.id == data.id){

				return element
			}
		});

		const { laterChat } = getState().myApplicationState;

		let filterLaterChat = laterChat.filter((element) => {

			if(element.id == data.id){

				return element
			}
		});

		if(filterActiveChat.length == 0 && filterLaterChat.length == 0){

			dispatch(addActiveChatDispatch(data));

		}	
	}
}

export const setActiveChat = responce => ({ type: SET_TO_ACTIVE_CHAT, responce });

export const addLaterChat = responce => ({ type: ADD_TO_LATER_CHAT, responce });

export const typing = responce => ({ type: TYPING, responce });

export const sendMessageDispatch = responce => ({ type: SEND_MESSAGE, responce });

export const socketMessage = (data) => {
	
	return (dispatch , getstate)=>{				

		if(getstate().myApplicationState.logIn[0].id == data.recever){

			dispatch(sendMessageDispatch(data));
		}	
	};
}
export const sendMessage = (data) => {
	
	return (dispatch)=>{

		let httpRequests = new XMLHttpRequest();

		httpRequests.onload = () => {	    		

			if(httpRequests.status == 201) {

				const responce = JSON.parse(httpRequests.response);

				dispatch(sendMessageDispatch(data));

			} else {

				console.log("Ajax is Failure On Get Data From errorMessages")

				dispatch(errorMessage("error"));
			}
		}

		httpRequests.onerrorMessage = () => {	

				console.log("Network errorMessage");

				dispatch(errorMessage("Network errorMessage"));
		};	

		httpRequests.open('POST', "http://ashik-zuch560:3000/messages" );

		httpRequests.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

		httpRequests.setRequestHeader("Content-Type" , "application/json;charset=utf-8");

		httpRequests.send(JSON.stringify(data));               		

	};
};

const setEmojiDispatch = responce => ({ type: SET_MY_EMOJI, responce });

export const setEmoji = () => {

	return (dispatch)=>{

		const httpRequests = new XMLHttpRequest();

		httpRequests.onload = () => {	    	

			if (httpRequests.status === 200) {

				const data = JSON.parse(httpRequests.response);

				dispatch(setEmojiDispatch(data));

			} else {

				console.log("Ajax is Failure On Get Data From errorMessages")

				dispatch(errorMessage("error"));
			}
		}

		httpRequests.onerrorMessage = () => {	

				console.log("Network errorMessage");

				dispatch(errorMessage("Network errorMessage"));
		};	

		httpRequests.open('GET', "http://ashik-zuch560:3000/emoji" );

		httpRequests.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

		httpRequests.send();               		

	};
};


