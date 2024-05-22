import { ACTIONS_TYPES } from "../actions/actions"
import { imageService } from "../../../../model/imageService"

const initialState = {
    id: '',
    ids: [],
    studies: [],
    masks: [],
    slider: {    
        maxSliderValue: 100,
        sliderValue: 50
    },
    plotWidth: 128,
    plotHeight: 128,
    processingStatus: {
        numberOfLayers: 0,
        numberOfLayersDone: 0,
        completionPercentage: 0
    },
    study: {},
    mask: {},
    imageData: [],
    fileUploaded: false,

}
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case ACTIONS_TYPES.POST_STUDY:
            return {
                ...state,
                ...action.payload
            }
        case ACTIONS_TYPES.GET_RESULT:
            return {
                ...state,
                ...action.payload
            }
        case ACTIONS_TYPES.GET_STATUS:
            return {
                ...state,
                ...action.payload
            }
        case ACTIONS_TYPES.INSTATE_ID:
            state.ids.push(action.payload.id)
            return {
                ...state,
                ...action.payload
            }
        case ACTIONS_TYPES.FILE_UPLOAD:
            console.log(state.studies, action.payload.study)
            state.studies.push(action.payload.study)
            return {
                ...state,
                ...action.payload
            }
        case ACTIONS_TYPES.CANVAS_DRAWING:
            return {
                ...state,
                ...action.payload
            }
        case ACTIONS_TYPES.SLIDER_MOVEMENT:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }


}
export default reducer