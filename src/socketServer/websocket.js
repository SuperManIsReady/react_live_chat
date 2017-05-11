let socket

export function init(){

	socket = new WebSocket("ws://ashik-zuch560:5596");

	socket.onmessage = (event) => {

		const data = JSON.parse(event.data);

		if(data.type){

			setTimeout(()=>{

				this.props.chatActions.typing(data);

			}, 50);
		}
		else{

			setTimeout(()=>{

				this.props.chatActions.socketMessage(data);

			}, 50);

		}	
	}
}

export function send(data){

	socket.send(data);

}
