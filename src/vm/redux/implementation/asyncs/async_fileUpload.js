import { ACTIONS_CREATORS } from "../actions/actions";
import { studyService } from '../../../../model/studyService.js';

function async_fileUpload(file) {
    return (dispatch, getState) => {
        (async () => {
            studyService.readFile(file, (result) => {
                dispatch(ACTIONS_CREATORS.FILE_UPLOAD(result))
            })
        })();
    }
}

export {async_fileUpload}