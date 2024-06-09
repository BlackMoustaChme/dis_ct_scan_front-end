import { ACTIONS_CREATORS } from "../actions/actions";
import { userService } from "../../../../model/userService";

function async_authorize() {
    return (dispatch, getState)=>{
        (async () => {
            console.log("src/vm/redux/impl/async.js")
            // const login = getState().login
            // const password = getState().password
            // Можно делать через ДТО объект
            userService.userAuth(getState().username, getState().password)
                .then((value) => {
                    if (value.value !== false) {
                        dispatch(ACTIONS_CREATORS.AUTHORIZE_USER(value.value, null));
                    }
                    else {
                        dispatch(ACTIONS_CREATORS.AUTHORIZE_USER(value.value, value.msg));
                    }
            })
                .catch(() => {
                    dispatch(ACTIONS_CREATORS.AUTHORIZE_USER(false));
                })
        })();
    };
}

export default async_authorize