import { GET_POST_DATA } from '../actionTypes';

const initialState = {
    posts: '',
    details: '',
    isLoggedIn: ''
 };
 
 const postReducer = (state = initialState, {type, payload}) => {
         switch (type) {
             case GET_POST_DATA: 
                 return{
                     ...state,
                     posts: payload.posts,
                     details: payload.details,
                     isLoggedIn: payload.isLoggedIn
                 }        
             default: return state;
         }
 }
 
 export default postReducer;