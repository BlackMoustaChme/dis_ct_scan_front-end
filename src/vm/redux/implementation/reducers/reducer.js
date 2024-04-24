import { ACTIONS_TYPES } from "../actions/actions"

const initialState = {
    id: '',
    ids: [],
    studies: [],
    masks: [],
    maxSliderValue: 100,
    minSliderValue: 0,
    sliderValue: 50,
    plotWidth: 128,
    plotHeight: 128,
    processingStatus: {
        numberOfLayers: 0,
        numberOfLayersDone: 0,
        completionPercentage: 0
    },

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
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }


}
export default reducer