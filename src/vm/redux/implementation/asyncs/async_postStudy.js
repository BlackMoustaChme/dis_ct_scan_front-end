import { ACTIONS_CREATORS } from "../actions/actions";
import { studyService } from '../../../../model/studyService.js';

function async_postStudy(formData) {
    return (dispatch, getState) => {
        (async () => {
            console.log(formData)
            studyService.postStudy(formData)
            .then((value) => {
                if(value !== null) {
                    dispatch(ACTIONS_CREATORS.INSTATE_ID(value))
                }
            })
            .catch(() => {
                console.log('CATCH')
            })
        })();
    }
}

export {async_postStudy}