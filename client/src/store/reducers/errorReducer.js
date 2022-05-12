import { GET_ERRORS } from '../actionTypes';

const initialState = {
   errors: {}
};

export default function(state = initialState, {type, payload}) {
        switch (type) {
            case GET_ERRORS: 
                return{
                    ...state,
                    errors: payload
                }        
            default: return state;
        }
}