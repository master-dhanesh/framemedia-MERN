import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import postReducer from './postReducer';

const reducer = combineReducers({
    auth: authReducer,
    errors: errorReducer,
    postDetails: postReducer
});

export default reducer;