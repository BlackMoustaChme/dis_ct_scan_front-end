import { Provider as ReduxProvider } from 'react-redux';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import store from './implementation/store.js';
import { async_getResult } from './implementation/asyncs/async_getResult.js';
import { async_getStatus } from './implementation/asyncs/async_getStatus.js';
import { async_postStudy } from './implementation/asyncs/async_postStudy.js';
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
export {buildProvider, useStudyIdListener, useStudyIdDispatcher, useStatusListener, useStatusDispatcher, useProcessStudyDispatcher}