import { ACCESS_TOKEN, API_BASE_URL_BACK } from '../constants/index';

export default class RequestService{

    // constructor(){

    // }

    request = function(correcto, incorrecto, metodo, path){
        var init = {};

        if(localStorage.getItem(ACCESS_TOKEN)) {
            var header = new Headers({
                Authorization : 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            });

            init = {
                method : metodo,
                headers : header
            };
        }else{
            init = {
                method : metodo
            }
        }

        fetch(API_BASE_URL_BACK+path, init)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            correcto(data);
        }).catch(function(error){
            console.log("error");
            incorrecto(error);
        })
        
    }
}