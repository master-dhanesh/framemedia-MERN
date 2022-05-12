import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Navigation from '../partials/Navigation';
import { connect } from 'react-redux';
import { registerUser } from '../../store/actions/authAction';

class Register extends Component {

    state ={
        name: '',
        username: '',
        password: '',
        city: '',
        about: '',
        email: '',
        gender: '',
        phone: '',
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
        const newUser = {
            name: this.state.name,
            password: this.state.password,
            username: this.state.username,
            city: this.state.city,
            about: this.state.about,
            email: this.state.email,
            gender: this.state.gender,
            phone: this.state.phone
        };   
        this.props.registerUser(newUser, this.props.history);
    }



    render() {  
        let errorObj = {};
        if(Array.isArray(this.state.errors)){
        this.state.errors.map( error => {
            if(error.param) errorObj[error.param] = ( <small className="text-danger">{error.msg}</small>) 
            return 0;              
         });}

        return (
            <div>
            <Navigation />
            <div className="container pt-3 pb-3 mt-5">
            <h4 className="display-5">Already have an account ?</h4>
            <Link className="btn btn-primary mt-3" to="/login">Log In Now</Link>
            <hr />
            { (typeof this.state.errors === 'string') ? <h3 className="text-center text-danger">{this.state.errors.toUpperCase()}</h3> : '' 
             }
            
            <h3 className="display-5">Register Now</h3>
            <form id="regForm" onSubmit={this.onSubmit}>
            <div className="form-row">
            <div className="form-group col-md-6">
            <label htmlFor="inputname">Name</label>
            <input type="text" onChange={this.onChange} name="name" className="form-control" id="inputname" placeholder="Name" />
            {errorObj.name ? errorObj.name : ''}
            </div>
            <div className="form-group col-md-6">
            <label htmlFor="inputusername">Username</label>
            <input type="text" onChange={this.onChange} name="username" className="form-control" id="inputusername" placeholder="Username" />
            {errorObj.username ? errorObj.username : ''}
            </div>
            <div className="form-group col-md-6">
            <label htmlFor="inputPassword4">Password</label>
            <input type="password" onChange={this.onChange} name="password" className="form-control" id="inputPassword4" placeholder="Password" />
            {errorObj.password ? errorObj.password : ''}
            </div>
            <div className="form-group col-md-6">
            <label htmlFor="inputEmail">Email</label>
            <input type="email" onChange={this.onChange} name="email" className="form-control" id="inputEmail" placeholder="Email" />
            {errorObj.email ? errorObj.email : ''}
            </div>
            </div>
            <div className="form-group">
            <label htmlFor="inputAddress">Something About You 
            <span role="img" aria-labelledby="jsx-a11y/accessible-emoji"> 🎭</span>
            </label>
            <textarea onChange={this.onChange}  name="about" className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="What you're good at, ambitions, about you..."></textarea>
            </div>
            <div className="form-row">
            <div className="form-group col-md-4">
            <label htmlFor="inputCity">City</label>
            <input type="text" onChange={this.onChange} name="city" className="form-control" id="inputCity" />
            {errorObj.city ? errorObj.city : ''}
            </div>
            <div className="form-group col-md-4">
            <label htmlFor="inputNumber">Contact Number</label>
            <input type="number"onChange={this.onChange} name="phone" className="form-control" id="inputNumber" />
            {errorObj.phone ? errorObj.phone : ''}
            </div>
            <div className="form-group col-md-4">
            <label htmlFor="inputState">Gender</label>
            <select name="gender" onChange={this.onChange} id="inputState" className="form-control">
            <option>Male</option>
            <option>Female</option>
            </select>
            </div>
            </div>
            <button type="submit" className="btn btn-success">Register Me</button>
            </form>
            </div>
            </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired

}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(Register);