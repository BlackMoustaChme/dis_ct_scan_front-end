import { ACTIONS_CREATORS } from "../actions/actions";
import { studyService } from '../../../../model/studyService.js';

function async_getResult() {
    return (dispatch, getState) => {
        (async () => {
            let id = getState().id
            studyService.getResult(id)
        })();
    }
}

export {async_getResult}