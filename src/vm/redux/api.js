import { Provider as ReduxProvider } from 'react-redux';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import store from './implementation/store.js';
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

export {buildProvider}