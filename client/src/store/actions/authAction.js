import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from '../actionTypes';
import setAuthToken from '../reducers/utilities/setAuthToken'
import jwt_decode from 'jwt-decode'

// Register user
export const registerUser = (userData,history) => dispatch => {
    axios
        .post('http://localhost:5000/register', userData)
        .then(res => history.push('/login'))
        .catch( err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

// Login - Get User Token
export const  loginUser = (userData, history) => dispatch => {
    axios
        .post('http://localhost:5000/login', userData)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            history.push('/timeline');
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded.user));
        })
        .catch( err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}


// log out 
export const logoutUser = history => dispatch => {
    history.push('/login');
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser(undefined))
}

// update user
export const updateUser = (userData, history) => dispatch => {
    axios.post('http://localhost:5000/update', userData)
    .then( () => dispatch(logoutUser(history)))
    .catch( err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }) )
}

// update user
export const updatePic = (userData, history) => dispatch => {
    console.log(userData);
    axios.post('http://localhost:5000/profilepic', userData)
    .then( res => console.log(res.data) )
    .catch( err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }) )
}