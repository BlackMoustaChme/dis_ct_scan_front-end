import { studyService } from "../../../../model/studyService";
const action = () => {
    return {type:'',payload:{}};
}

export const ACTIONS_TYPES = {
    POST_STUDY: 'post_study',
    GET_STATUS: 'get_status',
    GET_RESULT: 'get_result',
    INSTATE_ID: 'instate_id',
    FILE_UPLOAD: 'file_upload',

}

export const  ACTIONS_CREATORS = {
    POST_STUDY: () => {

    },
    GET_RESULT: (value) => {
        let a = action();
        a.type = ACTIONS_TYPES.GET_RESULT
        console.log(value)
        // a.payload.masks = value
        return a
    },
    GET_STATUS: (value) => {
        let a = action();
        a.type = ACTIONS_TYPES.GET_STATUS
        a.payload.processingStatus = value
        return a
    },
    INSTATE_ID: (value) => {
        let a = action();
        a.type = ACTIONS_TYPES.INSTATE_ID
        a.payload.id = value.Study.id
        return a
    },

    FILE_UPLOAD: (value) => {
        let a = action()
        a.type = ACTIONS_TYPES.FILE_UPLOAD
        console.log(value)
        a.payload.slider = value.slider
        return a
    },
}