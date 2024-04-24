import { ACTIONS_CREATORS } from "../actions/actions";
import { studyService } from '../../../../model/studyService.js';

function async_getStatus() {
    return (dispatch, getState) => {
        (async () => {
            let id = getState().id
            studyService.getStatus(id)
            .then((value) => {
                if (value !== null) {
                    dispatch(ACTIONS_CREATORS.GET_STATUS(value))
                }
            })
            .catch(() => {
                console.log("CATCH")
            })
        })();
    }
}

export {async_getStatus}