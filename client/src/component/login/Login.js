import React, { Component } from 'react';
import Navigation from '../partials/Navigation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../../store/actions/authAction';
import './Login.css';

class Login extends Component {

    state ={
        username: '',
        password: '',
        errors: ''
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.errors) this.setState({errors: nextProps.errors.errors});
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault(); 
        const userData = {
            password: this.state.password,
            username: this.state.username
        };   
        this.props.loginUser(userData, this.props.history);
    }


    render() {
        let errorObj = {};
        if(Array.isArray(this.state.errors)){
        this.state.errors.map( error => {
            if(error.param) errorObj[error.param] = error.msg;
            return 0;              
         });}

        return (
            <div>
            <Navigation />
            <div id="loginBg">
            <div id="loginMenu">
            <div id="icon"></div>
            <form className="text-center" onSubmit={this.onSubmit} >
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Username</label>
                <input type="text" onChange={this.onChange} name="username" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username Please..." />
                <small className="text-danger">{errorObj.username ? errorObj.username : this.state.errors.username ? this.state.errors.username : ''}</small>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" onChange={this.onChange} name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                <small className="text-danger">{errorObj.password ? errorObj.password : this.state.errors.password ? this.state.errors.password : ''}</small>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            </div>
            </div>
            </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired

}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
