import {GET_POST_DATA} from '../actionTypes'
import axios from 'axios';

// timeline
export const timeline = () => dispatch => {
    axios
        .get('http://localhost:5000/timeline')
        .then(res => dispatch(postDetails(res.data)))
        .catch(err => err.response);
}

// dispatching post
export const postDetails = postDetails => {
    return{
        type: GET_POST_DATA,
        payload: postDetails
    }
}

// like
export const like = (postId) => dispatch => {
    axios
        .get(`http://localhost:5000/like/${postId}`)
        .then( () => dispatch(timeline()) )
        .catch(err => err.response);
}

// love
export const love = (postId) => dispatch => {
    axios
        .get(`http://localhost:5000/love/${postId}`)
        .then( () => dispatch(timeline()) )
        .catch(err => err.response);
}

// dislike
export const dislike = (postId) => dispatch => {
    axios
        .get(`http://localhost:5000/dislike/${postId}`)
        .then( () => dispatch(timeline()) )
        .catch(err => err.response);
}

