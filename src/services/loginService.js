import { ACCESS_TOKEN, API_BASE_URL_BACK } from '../constants/index';

export default class LoginService{

    login = function (email, password, callSuccess, callError, init) {

        if(localStorage.getItem(ACCESS_TOKEN)) {
            var header = new Headers({
                Authorization : 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)    
            });
            console.log("token encontrado");
            init = {
                method : "POST",
                headers : header
            };
        }else{
            init = {
                method : "POST",
            };
        }

        fetch(API_BASE_URL_BACK+"/paseadores/login/"+email+"/"+password,init)
        .then(function(response){
            if(response.ok) return response.text();
            callError();
        })
        .then((data) => {
            console.log(data);
            callSuccess(data);
        });
    }

    validate = function (correct, incorrect) {
        var header = new Headers({
            Authorization : 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        });
        var init = {
            method : "POST",
            headers : header
        };

        fetch(API_BASE_URL_BACK+"/paseadores/login/validate",init)
        .then(function(response) {
            if(response.ok){
                correct()
            }else{
                incorrect()
            }
        })
        .catch((error) => {
            console.log("ERROR: "+error);
            incorrect();
        });
    }

    registrar = function(email, password, nombre, cedula, telefono, correct, incorrect) {
        var init = {
            method : "POST"
        };

        fetch(API_BASE_URL_BACK+"/paseadores/register/"+email+"/"+password+"/"+nombre+"/"+cedula+"/"+telefono, init)
        .then(function(response) {
            if(response.ok) return response.text();
            incorrect(response);
        })
        .then(function(token) {
            correct(token);
        })
        .catch(function(error) {
            incorrect(error);
        })
    }
}