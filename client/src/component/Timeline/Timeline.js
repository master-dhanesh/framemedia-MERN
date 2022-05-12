import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../partials/Navigation';
import PropTypes from 'prop-types';
import { timeline, like, love, dislike } from '../../store/actions/postActions';
import Loader from '../Loader/Loader';
import './Timeline.css';
import { connect } from 'react-redux';

class Timeline extends Component {
    state = {
        user: this.props.auth.user,
        details: this.props.postDetails.details,
        posts: this.props.postDetails.posts,
        isLoggedIn : this.props.postDetails.isLoggedIn,
        errors: this.props.errors.errors
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.postDetails) 
        this.setState({user: nextProps.auth.user, 
                        details: nextProps.postDetails.details,
                        posts: nextProps.postDetails.posts,
                        isLoggedIn: nextProps.postDetails.isLoggedIn});
    }

    render() {                
        let posts = '' ;
        if(!this.props.postDetails.posts)
            posts = <Loader />
        else { 
            posts = this.state.posts.map( post => (           
                    <div className="post" key={post._id}>
                    <div className="postTop">
                    <div className="usrPrfl">
                    <img className="prflpic"
                    src={`${post.postedBy.profilePic}`}
                    alt="Network Error" />
                    </div>
                    <div className="postDetails">
                    <Link to="profile.postedBy.id"><h6>{post.postedBy.name}</h6></Link>
                    <small>{post.postedBy.city}</small>
                    </div>
                    </div>
                    <p>{post.postText}</p>
                    <small>{post.likes.length} Likes, {post.dislikes.length} dislikes, & {post.loves.length} Love Reactions</small>
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
                    </div>  
                         
            ));
        }
        

        return (
            <div>
                <Navigation />
            <div className="container pt-5 mt-4">
                <h2 className="display-5">Hello, {this.state.user.name} <span role="img" aria-labelledby="jsx-a11y/accessible-emoji">👋</span> </h2>
                <p className="lead">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt, consequuntur quod nihil, quam
                obcaecati iure similique atque eius et impedit nam eveniet est.</p>
                <Link to="/profile" className="btn btn-primary">I Want To Write A Post</Link>
                <hr />
                <h4 className="lead">Latest Posts</h4>
                <div className="posts mt-3">  
                {posts}
                </div>
            </div>
        </div>
        )
    }
}

Timeline.propTypes = {
    timeline: PropTypes.func.isRequired,
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
    errors: state.errors
});

export default connect(mapStateToProps, { timeline, love, like, dislike })(Timeline);
