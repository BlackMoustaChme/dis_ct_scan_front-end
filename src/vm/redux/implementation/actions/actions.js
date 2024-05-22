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
        a.payload.study = { 
            name: value.name,
            niftiHeader: value.header,
            niftiImage: value.image
        }
        a.payload.fileUploaded = true
        return a
    },

    CANVAS_DRAWING: (imageData) => {
        let a = action()
        a.type = ACTIONS_TYPES.CANVAS_DRAWING
        a.payload.imageData = imageData
        a.payload.fileUploaded = false
        return a
    },

    SLIDER_MOVEMENT: (imageData, slider) => {
        let a = action()
        a.type = ACTIONS_TYPES.SLIDER_MOVEMENT
        a.payload.slider = slider
        a.payload.imageData = imageData
        return a
    }
}