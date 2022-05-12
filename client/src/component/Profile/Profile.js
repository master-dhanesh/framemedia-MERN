import React, { Component } from 'react'
import { connect } from 'react-redux';
import './Profile.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Navigation from '../partials/Navigation';
import { like, love, dislike } from '../../store/actions/postActions';
import { post } from '../../store/actions/profileAction';
import HOC from '../HOC/HOC';
import Loader from '../Loader/Loader';

class Profile extends Component {

    state = {
        user: this.props.auth.user,
        details: this.props.postDetails.details,
        isUser:  this.props.auth.isAuthenticated,
        posts:  this.props.postDetails.posts,
        postData: ''
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.postDetails) 
        this.setState({ details: nextProps.postDetails.details,posts: nextProps.postDetails.posts });
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        this.props.post(this.state.postData);
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        let validUser = '';
        if(this.state.isUser){
            validUser = (
                <HOC>                
                    <Link className="mt-4 btn btn-sm btn-primary" to="/update">Edit Profile</Link>
                    <form className="mt-4" onSubmit={this.onSubmitHandler} method="POST">
                    <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">What's your current thought ?</label>
                    <textarea className="form-control" defaultValue={this.state.postData}  onChange={this.onChange} name="postData" id="exampleFormControlTextarea1" rows="3"
                    placeholder="Write your thought here..."></textarea>
                    </div>
                    <button className="btn btn-primary">Post It</button>
                    </form>                    
                </HOC>
            )
        } else {
            validUser = (
                <HOC>
                    <div className="icns flexy">
                    <Link to={`tel: ${this.state.user.phone}`} title="Call Now" className="icon"><i className="fa fa-phone"></i></Link>
                    <Link to={`/notification/${this.state.user._id}`}><span title="Buzz Them" className="icon ml-3"><i
                    className="fa fa-bell"></i></span></Link>
                    <span data-toggle="modal" data-target="#exampleModalCenter" title="Say Anonymously" className="icon ml-3"><i
                    className="fa fa-comment"></i></span>
                    </div>                
                </HOC>
                )
        }

        let showPost = <Loader />
        if(this.state.details){
        showPost = this.state.posts.reverse().map( post => 
                (this.state.details.posts.indexOf(post._id) !== -1) ?
                (<div className="post" key={post._id}>
                <div className="postTop">
                <div className="usrPrfl">
                <img className="prflpic" src={this.state.user.profilePic} alt="network error" />
                </div>
                <div className="postDetails">
                <h6>{this.state.user.name}</h6>
                <small>{this.state.user.city}</small>
                </div>
                </div>
                <p>{post.postText}</p>
                <small>
                { (post.likes) ? post.likes.length : 0 } Likes,
                { (post.dislikes) ? post.dislikes.length : 0 } dislikes,
                { (post.loves) ? post.loves.length : 0 } Love Reactions</small>
                <div className="options">
                <span id="love" title="Love" className="icon">
                <span onClick={ () => this.props.love(post._id)} ><i className="fa fa-heart"></i></span>
                </span>
                <span id="like" title="Like" className="icon">
                <span onClick={ () => this.props.like(post._id)} >><i className="fa fa-thumbs-up"></i></span>
                </span>
                <span id="dislike" title="Dislike" className="icon">
                <span onClick={ () => this.props.dislike(post._id)} ><i className="fa fa-thumbs-down"></i></span>
                </span>
                </div>
                </div>)
                : ''
        );
        }

        return (
            <div>                              
                <Navigation />
                <div className="flex container mt-5 pt-4 pb-4">
                <div id="left">
                <div className="profilePicFrame">
                <div id="profilePic">
                <img className="prflpic" src={this.state.user.profilePic} alt="network error" />
                </div>
                </div>
                <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog"
                aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Send Message Anonymously</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
                </div>
                {/* <form action='/messages/details._id' method="post">
                <div className="modal-body">
                <div className="form-group">
                <label for="exampleFormControlTextarea1">Write your Message here ...</label>
                <textarea name="message" className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                </div>
                <div className="modal-footer">
                <input type="submit" className="btn btn-primary" value="Send Message" />
                </div>
                </form> */}
                </div>
                </div>
                </div>
                <div className="details p-2 pl-3 pr-3">
                <h4>{this.state.user.name}</h4>
                <h6 className="lead">Designer & Developer</h6>
                <p className="lead mt-4">{this.state.user.about}</p>

                {validUser}               


                <hr />
                <div className="prevPost mt-4">
                <h4>Previous Posts</h4>
                <small>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit facilis atque exercitationem
                magni?</small>
                <div id="posts" className="posts mt-4">
                
                {showPost}

                <p className="text-center"><small>No More Posts Left</small></p>
                </div>
                 </div>
                </div>
                </div>
                <div id="right">
                </div>
                </div>
            </div>
        )
    }
}

Profile.propTypes = {
    post: PropTypes.func.isRequired,
    love: PropTypes.func.isRequired,
    like: PropTypes.func.isRequired,
    dislike: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    postDetails: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    postDetails: state.postDetails,
    profileDetails: state.profileDetails,
    errors: state.errors
});

export default connect(mapStateToProps, { love, like, dislike, post })(Profile);