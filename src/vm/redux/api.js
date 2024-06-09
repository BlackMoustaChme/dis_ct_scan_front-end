import { Provider as ReduxProvider } from 'react-redux';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import store from './implementation/store.js';
import { async_getResult } from './implementation/asyncs/async_getResult.js';
import { async_getStatus } from './implementation/asyncs/async_getStatus.js';
import { async_postStudy } from './implementation/asyncs/async_postStudy.js';
import { ACTIONS_CREATORS } from './implementation/actions/actions.js';
import { async_fileUpload } from './implementation/asyncs/async_fileUpload.js';
import async_canvasDrawing from './implementation/asyncs/async_canvasDrawing.js';
import async_canvasMaskDrawing from './implementation/asyncs/async_canvasMaskDrawing.js';
import { async_sliderMovement2 } from './implementation/asyncs/async_sliderMovement.js';
import { async_sliderMovement } from './implementation/asyncs/async_sliderMovement.js';
import async_authorize from './implementation/asyncs/async_authorize.js';
//***************************************************************

function buildProvider() {
    return (props)=> {
        return (
            <ReduxProvider store = {store}>
                {props.children}
            </ReduxProvider>
        );
    };
};

//***************************************************************

function usePasswordListener() {
    return useSelector((state) => state.password)
}

function useUsernameListener() {
    return useSelector((state) => state.username)
}

function useIsAuthorizedListener() {
    return useSelector((state) => state.isAuthorized)
}

function usePasswordDispatcher() {
    const dispatch = useDispatch()
    return (value) => dispatch(ACTIONS_CREATORS.UPDATE_PASSWORD(value))
}

function useUsernameDispatcher() {
    const dispatch = useDispatch()
    return (value) => dispatch(ACTIONS_CREATORS.UPDATE_USERNAME(value))
}

function useAuthorizationDispatcher() {
    const dispatch = useDispatch()
    return () => dispatch(async_authorize())
}

function useStudyIdListener() {
    return useSelector((state) => state.id)
}

function useStudiesIdListener() {
    return useSelector((state) => state.ids)
}

function useStudiesNameListener() {
    return useSelector((state) => state.names)
}

function useStudyIdDispatcher() {

}

function useStatusListener() {
    return useSelector((state) => state.processStatus)
}

function useStatusDispatcher() {
    const dispatch = useDispatch()
    return (id) => dispatch(async_getStatus(id))
}

function useProcessStudyDispatcher() {
    const dispatch = useDispatch()
    return (formData) => dispatch(async_postStudy(formData))
}

function useResultListener() {
    
}

function useResultDispatcher() {
    const dispatch = useDispatch()
    return (id) => dispatch(async_getResult(id))
}

function useSliderValuesListener() {
    return useSelector((state) => {
        // console.log(state.slider)
        return state.slider})
}

function useFileUploadedListener() {
    return useSelector((state) => state.fileUploaded)
}

function useStudyPostedListener() {
    return useSelector((state) => state.studyPosted)
}

function useStudyPostMessageListener() {
    return useSelector((state) => state.studyPostMsg)
}

function useStudySelectedListener() {
    return useSelector((state) => state.studySelected)
}

function useFileUploadDispatcher() {
    const dispatch = useDispatch()
    return (file) => dispatch(async_fileUpload(file))
}

function useStudyListener() {
    return useSelector((state) => state.study)
}

function useStudiesListener() {
    return useSelector((state) => state.studies)
}

function useImageListener() {
    return useSelector((state) => state.imageData)
}

function useImageDispatcher() {
    const dispatch = useDispatch()
    return (canvas) => dispatch(async_canvasDrawing(canvas))
}

function useMaskedImageDispatcher() {
    const dispatch = useDispatch()
    return (canvas) => dispatch(async_canvasMaskDrawing(canvas))
}


function useSliderMovementDispatcher() {
    const dispatch = useDispatch()
    return (canvas, maskCanvas, value) => dispatch(async_sliderMovement(canvas, maskCanvas, value))
}

function useSliderMovementDispatcher2() {
    const dispatch = useDispatch()
    return (value) => dispatch(ACTIONS_CREATORS.SLIDER_MOVEMENT(null, value)/*async_sliderMovement2(value)*/)
}

function useSelectedStudyListener() {
    return useSelector((state) => state.selectedStudy)
}

function useSelectedStudyDispatcher() {
    const dispatch = useDispatch()
    return (id) => dispatch(ACTIONS_CREATORS.STUDY_SELECT(id))
}

function useIsHistoryPresentListener() {
    return useSelector((state) => state.isHistoryPresent)
}

function useSliderIncreaseDispatcher() {
    const dispatch = useDispatch()
    return (canvas, maskCanvas, value) => dispatch(async_sliderMovement(canvas, maskCanvas, parseInt(value) + 1))
    // return (value) => dispatch(ACTIONS_CREATORS.SLIDER_INCREASE(value))
}

function useSliderDecreaseDispatcher() {
    const dispatch = useDispatch()
    return (canvas, maskCanvas, value) => dispatch(async_sliderMovement(canvas, maskCanvas, parseInt(value) - 1))
    // return (value) => dispatch(ACTIONS_CREATORS.SLIDER_DECREASE(value))
}

function useLogoutDispatcher() {
    const dispatch = useDispatch()
    return () => dispatch(ACTIONS_CREATORS.LOGOUT_USER())
}

export {buildProvider, useStudyIdListener, useStudyIdDispatcher, useStatusListener, useStatusDispatcher, useProcessStudyDispatcher, useResultDispatcher,
useSliderValuesListener, useFileUploadDispatcher, useFileUploadedListener, useImageListener, useImageDispatcher, useStudyListener, useSliderMovementDispatcher,
useStudiesListener, useStudiesIdListener, useSelectedStudyListener, useSelectedStudyDispatcher, useStudySelectedListener, useMaskedImageDispatcher, 
useStudiesNameListener, useIsHistoryPresentListener, usePasswordListener, usePasswordDispatcher, useUsernameListener, useUsernameDispatcher, useIsAuthorizedListener,
useAuthorizationDispatcher, useSliderDecreaseDispatcher, useSliderIncreaseDispatcher, useLogoutDispatcher, useStudyPostedListener, useSliderMovementDispatcher2,
useStudyPostMessageListener}