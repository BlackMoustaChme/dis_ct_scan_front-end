import { ACTIONS_CREATORS } from "../actions/actions";
import { studyService } from '../../../../model/studyService.js';

function async_getStatus(id) {
    return (dispatch, getState) => {
        (async () => {
            studyService.initializeStatusSSE(id)
            let oldMsg = ''
            studyService.getStatusSSE(id, (msg) => {
                // console.log("status step 4")
                if (msg === "None") {
                    studyService.closeStatusSSE(id)
                    dispatch(ACTIONS_CREATORS.GET_STATUS(id, "Done"))
                }
                else {
                    if (oldMsg !== msg) {
                        // console.log("status step 7")
                        dispatch(ACTIONS_CREATORS.GET_STATUS(id, msg.split("'")[1]))
                        oldMsg = msg
                    }
                }
            })
        })();
    }
}

export {async_getStatus}