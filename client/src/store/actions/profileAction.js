import {timeline} from './postActions'
import axios from 'axios';

// adding post
export const post = postData => dispatch => {
    axios.post('http://localhost:5000/post', {post: postData})
    .then( () => dispatch(timeline()))
    .catch( err => err.response )
}
