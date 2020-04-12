import SockJS from "sockjs-client"
import Stomp from 'stompjs'
import { API_BASE_URL_BACK } from '../constants/index';

export default class WebSocket{

    constructor() {
        this.socket = SockJS(API_BASE_URL_BACK + "/easyCareSocket");
        this.ws = Stomp.over(this.socket);
    }
    
    connectAndSubscribe = function(conectar){
        var ww = this.ws;
        this.ws.connect({}, function(frame){
            conectar(ww);
        });
    }


    disconnect = function(){
        if(this.ws != null){
            this.ws.disconnect();
        }
        console.info("Socket desconected");
    }


}