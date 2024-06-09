import { asyncAuthUser, asyncGetUserInfo } from "../api/request"
import { User } from "./dto/user";

function _save(token) {
    localStorage.setItem('token', token);
    document.cookie = token
}

export const userService = {

    async userAuth(username, password) {
        console.log("auth")
        let login = 
        {
            "username": username,
            "password": password
        }
        let response = await asyncAuthUser(login)
        let bodyInfo = null
        let answer = null
        switch(response.getStatus()){
            case 200:
                console.log(response.getBody())
                bodyInfo = response.getBody()
                _save(bodyInfo.data.user_access_token)
                answer = {
                    msg: null,
                    value: true
                }
                return answer
            case 401:
                console.log(response.getBody())
                bodyInfo = response.getBody()
                answer = {
                    msg: bodyInfo.detail.description,
                    value: false
                }
                return answer
            case 422:
                console.log(response.getBody())
                return null
            default:
                return Promise.reject()
        }
    },

    async userInfo() {
        let response = await asyncGetUserInfo(this.getToken())
        switch(response.getStatus()){
            case 200:
                console.log(response.getBody())
                return response.getBody()
            case 401:
                console.log(response.getBody())
                return null
            case 422:
                console.log(response.getBody())
                return null
            default:
                return Promise.reject()
        }
    },

    logout(){
        localStorage.removeItem('token');

    },

    getToken(){
        return localStorage.getItem('token');
    }
}