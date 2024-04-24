const action = () => {
    return {type:'',payload:{}};
}

export const ACTIONS_TYPES = {
    POST_STUDY: 'post_study',
    GET_STATUS: 'get_status',
    GET_RESULT: 'get_result',
    INSTATE_ID: 'instate_id',

}

export const  ACTIONS_CREATORS = {
    POST_STUDY: () => {

    },
    GET_RESULT: () => {

    },
    GET_STATUS: (value) => {
        let a = action();
        a.type = ACTIONS_TYPES.GET_STATUS
        console.log(value)
        a.payload.processingStatus = value
        return a
    },
    INSTATE_ID: (value) => {
        let a = action();
        a.type = ACTIONS_TYPES.INSTATE_ID
        a.payload.id = value.Study.id
        return a
    },
}