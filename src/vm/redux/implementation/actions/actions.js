import { studyService } from "../../../../model/studyService";
import { imageService } from "../../../../model/imageService";
const action = () => {
    return {type:'', payload:{}};
}

export const ACTIONS_TYPES = {
    POST_STUDY: 'post_study',
    GET_STATUS: 'get_status',
    GET_RESULT: 'get_result',
    INSTATE_ID: 'instate_id',
    FILE_UPLOAD: 'file_upload',
    CANVAS_DRAWING: 'canvas_drawing',
    SLIDER_MOVEMENT: 'slider_movement',
    STUDY_SELECT: 'study_select',
    UPDATE_USERNAME: 'update_username',
    UPDATE_PASSWORD: 'update_password',
    AUTHORIZE_USER: 'authorize_user',
    LOGOUT_USER: 'logout_user',
    SLIDER_INCREASE: 'slider_increase',
    SLIDER_DECREASE: 'slider_decrease',

}

export const  ACTIONS_CREATORS = {
    POST_STUDY: () => {

    },
    GET_RESULT: (id, value) => {
        let a = action();
        a.type = ACTIONS_TYPES.GET_RESULT
        a.payload.mask = value
        a.payload.id = id
        return a
    },
    GET_STATUS: (id, value) => {
        let a = action();
        // console.log(id)
        a.type = ACTIONS_TYPES.GET_STATUS
        a.payload.id = id
        a.payload.processStatus = value
        a.payload.studyPosted = false
        return a
    },
    INSTATE_ID: (value) => {
        let a = action();
        a.type = ACTIONS_TYPES.INSTATE_ID
        a.payload.studyPosted = true
        console.log(value)
        a.payload.id = value.value
        a.payload.studyPostMsg = value.message
        return a
    },

    FILE_UPLOAD: (value) => {
        let a = action()
        a.type = ACTIONS_TYPES.FILE_UPLOAD
        console.log(value)
        a.payload.slider = value.slider
        a.payload.study = {
            id:"",
            name: value.name,
            niftiHeader: value.header,
            niftiImage: value.image,
            slider: value.slider
        }
        a.payload.fileUploaded = true
        a.payload.studyPostMsg = ''
        return a
    },

    CANVAS_DRAWING: (imageData) => {
        let a = action()
        a.type = ACTIONS_TYPES.CANVAS_DRAWING
        a.payload.imageData = imageData
        a.payload.fileUploaded = false
        a.payload.studySelected = false
        return a
    },

    SLIDER_MOVEMENT: (imageData, slider) => {
        let a = action()
        a.type = ACTIONS_TYPES.SLIDER_MOVEMENT
        // a.payload.slider = {slider}
        a.payload.value = slider
        a.payload.imageData = imageData
        return a
    },

    STUDY_SELECT: (id) => {
        let a = action()
        a.type = ACTIONS_TYPES.STUDY_SELECT
        a.payload.id = id
        a.payload.studySelected = true
        return a
    },
    UPDATE_PASSWORD: (value) => {
        let a = action()
        a.type = ACTIONS_TYPES.UPDATE_PASSWORD
        a.payload.password = value
        return a
    },
    UPDATE_USERNAME: (value) => {
        let a = action()
        a.type = ACTIONS_TYPES.UPDATE_USERNAME
        a.payload.username = value
        return a
    },
    AUTHORIZE_USER: (boolean, msg) => {
        let a = action()
        a.type = ACTIONS_TYPES.AUTHORIZE_USER
        a.payload.isAuthorized = boolean
        a.payload.authorizationErrorMsg = msg
        return a
    },
    LOGOUT_USER: () => {
        let a = action()
        a.type = ACTIONS_TYPES.LOGOUT_USER
        a.payload.isAuthorized = false
        return a
    },
    //???
    SLIDER_INCREASE: (value) => {
        let a = action()
        a.type = ACTIONS_TYPES.SLIDER_INCREASE
        a.payload.value = value
        return a
    },
    //???
    SLIDER_DECREASE: (value) => {
        let a = action()
        a.type = ACTIONS_TYPES.SLIDER_DECREASE
        a.payload.value = value
        return a
    }

}