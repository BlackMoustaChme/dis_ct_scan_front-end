import { ACTIONS_TYPES } from "../actions/actions"
import { imageService } from "../../../../model/imageService"
import { userService } from "../../../../model/userService"

// console.log(localStorage.getItem('Ids'), localStorage.getItem('Ids').split(','))
// console.log(localStorage.getItem('Names'), localStorage.getItem('Names').split(','))
const initialState = {
    username:'',
    password:'',
    isAuthorized: userService.getToken() !== null ? true : false,
    authorizationErrorMsg: null,
    id: '',
    ids: localStorage.getItem('Ids') != null ? localStorage.getItem('Ids').split(',') : [],
    names: localStorage.getItem('Names') != null ? localStorage.getItem('Names').split(',') : [],
    studies: [],
    masks: [],
    slider: {    
        maxSliderValue: 100,
        sliderValue: 50
    },                               
    plotWidth: 128,
    plotHeight: 128,
    processStatus:'',
    study: {},
    mask: {},
    imageData: [],
    fileUploaded: false,
    studyPosted: false,
    studyPostMsg: '',
    selectedStudy: {},
    studySelected: false,
    isHistoryPresent: localStorage.getItem('Ids') != null ? true : false

}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case ACTIONS_TYPES.POST_STUDY:
            return {
                ...state,
                ...action.payload
            }
        case ACTIONS_TYPES.GET_RESULT:
            console.log(action.payload.mask)
            state.studies.map((value) => {if(value.id === action.payload.id) {
                value.mask.niftiMaskHeader = value.niftiHeader
                value.mask.niftiMaskImage = value.niftiImage
                value.mask.maskData = action.payload.mask
            }})
            console.log(state.studies)
            return {
                ...state,
                ...action.payload
            }
        case ACTIONS_TYPES.GET_STATUS:
            // console.log(action.payload.processStatus)
            state.studies.map((value) => {if(value.id === action.payload.id){
                value.processStatus = action.payload.processStatus
            }})
            console.log(state.studies)
            return {
                ...state,
                ...action.payload
            }
        case ACTIONS_TYPES.INSTATE_ID:
            var study = {
                id: action.payload.id, 
                name: state.study.name,
                niftiHeader: state.study.niftiHeader,
                niftiImage: state.study.niftiImage,
                slider: state.study.slider,
                processStatus: "", 
                mask: {
                    maskData: null,
                    niftiMaskHeader: null,
                    niftiMaskImage: null
                }
            }
            state.ids.push(action.payload.id)
            state.names.push(state.study.name)
            localStorage.setItem("Ids", state.ids.toString())
            localStorage.setItem("Names", state.names.toString())
            state.studies.push(study)
            return {
                ...state,
                ...action.payload
            }
        case ACTIONS_TYPES.FILE_UPLOAD:
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
            console.log(action.payload.value)
            // state.slider.sliderValue = action.payload.value
            
            var sli = {
                sliderValue: action.payload.value.sliderValue,
                maxSliderValue: action.payload.value.maxSliderValue
            }
            state.slider = sli
            state.selectedStudy.slider = sli
            console.log(state.slider.sliderValue)
            return {
                ...state,
                ...action.payload
            }
        case ACTIONS_TYPES.STUDY_SELECT:
            state.studies.map((value) => {if(value.id === action.payload.id){
                state.selectedStudy = value
                state.slider = value.slider
            }})
            return {
                ...state,
                ...action.payload
            }
        case ACTIONS_TYPES.UPDATE_PASSWORD:
            return {
                ...state,
                ...action.payload
            }
        case ACTIONS_TYPES.UPDATE_USERNAME:
            return {
                ...state,
                ...action.payload
            }
        case ACTIONS_TYPES.AUTHORIZE_USER:
            return {
                ...state,
                ...action.payload
            }
        case ACTIONS_TYPES.LOGOUT_USER:
            userService.logout()
            return {
                ...state,
                ...action.payload
            }
            //???
        case ACTIONS_TYPES.SLIDER_INCREASE:
            console.log("increase")
            state.selectedStudy.slider.sliderValue = action.payload.value + 1
            state.slider.sliderValue = action.payload.value + 1
            return {
                ...state,
                ...action.payload
            }
            //???
        case ACTIONS_TYPES.SLIDER_DECREASE:
            console.log("decrease")
            state.selectedStudy.slider.sliderValue = action.payload.value - 1
            state.slider.sliderValue = action.payload.value - 1
            return {
                ...state,
                ...action.payload
            } 
        default:
            return state
    }


}
export default reducer