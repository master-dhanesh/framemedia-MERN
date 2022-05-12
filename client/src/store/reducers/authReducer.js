import { SET_CURRENT_USER } from '../actionTypes';

const initialState = {
   isAuthenticated: false,
   user: {}
};

const userReducer = (state = initialState, {type, payload}) => {
        switch (type) {
            case SET_CURRENT_USER: 
                return{
                    ...state,
                    isAuthenticated: payload ? true : false,
                    user: payload
                }        
            default: return state;
        }
}

export default userReducer;