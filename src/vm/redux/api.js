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
import async_sliderMovement from './implementation/asyncs/async_sliderMovement.js';
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

function useStudyIdListener() {
    return useSelector((state) => state.id)
}

function useStudiesIdListener() {
    return useSelector((state) => state.ids)
}

function useStudyIdDispatcher() {

}

function useStatusListener() {
    return useSelector((state) => state.processingStatus)
}

function useStatusDispatcher() {
    const dispatch = useDispatch()
    return () => dispatch(async_getStatus())
}

function useProcessStudyDispatcher() {
    const dispatch = useDispatch()
    return (formData) => dispatch(async_postStudy(formData))
}

function useResultListener() {
    
}

function useResultDispatcher() {
    const dispatch = useDispatch()
    return () => dispatch(async_getResult())
}

function useSliderValuesListener() {
    return useSelector((state) => state.slider)
}

function useFileUploadedListener() {
    return useSelector((state) => state.fileUploaded)
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

function useSliderMovementDispatcher() {
    const dispatch = useDispatch()
    return (canvas, value) => dispatch(async_sliderMovement(canvas, value))
}

export {buildProvider, useStudyIdListener, useStudyIdDispatcher, useStatusListener, useStatusDispatcher, useProcessStudyDispatcher, useResultDispatcher,
useSliderValuesListener, useFileUploadDispatcher, useFileUploadedListener, useImageListener, useImageDispatcher, useStudyListener, useSliderMovementDispatcher,
useStudiesListener, useStudiesIdListener}