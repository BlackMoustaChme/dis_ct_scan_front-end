import { ACTIONS_CREATORS } from "../actions/actions";
import { studyService } from '../../../../model/studyService.js';

function async_getResult() {
    return (dispatch, getState) => {
        (async () => {
            let id = getState().id
            studyService.getResult(id)
            .then((value) => {
                if(value !== null)
                dispatch(ACTIONS_CREATORS.GET_RESULT(value))
            })
            .catch(() => {
                console.log("CATCH")
            })
        })();
    }
}

export {async_getResult}