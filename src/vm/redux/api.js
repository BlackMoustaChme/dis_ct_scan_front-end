import { Provider as ReduxProvider } from 'react-redux';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import store from './implementation/store.js';
import { async_getResult } from './implementation/asyncs/async_getResult.js';
import { async_getStatus } from './implementation/asyncs/async_getStatus.js';
import { async_postStudy } from './implementation/asyncs/async_postStudy.js';
import { ACTIONS_CREATORS } from './implementation/actions/actions.js';
import { async_fileUpload } from './implementation/asyncs/async_fileUpload.js';
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

function useFileUploadDispatcher() {
    const dispatch = useDispatch()
    return (file) => dispatch(async_fileUpload(file))
}
export {buildProvider, useStudyIdListener, useStudyIdDispatcher, useStatusListener, useStatusDispatcher, useProcessStudyDispatcher, useResultDispatcher,
useSliderValuesListener, useFileUploadDispatcher}