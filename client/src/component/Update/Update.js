import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Update.css';
import Navigation from '../partials/Navigation';
import { updateUser, updatePic } from '../../store/actions/authAction'
import Axios from 'axios';

class Update extends Component {

    state = {
        name: this.props.auth.user.name,
        username: this.props.auth.user.username,
        about: this.props.auth.user.about,
        city: this.props.auth.user.city,
        phone: this.props.auth.user.phone,
        profilePic: this.props.auth.user.profilePic,
        errors: ''
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.errors) this.setState({errors: nextProps.errors.errors});
    }

    onChange = (e) => {
           
        this.setState({ [e.target.name] : e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();

        let updateUser = {
            name: this.state.name,
            username: this.state.username,
            about: this.state.about,
            city: this.state.city,
            phone: this.state.phone,
            profilePic: this.state.profilePic,
        }
        this.props.updateUser(updateUser, this.props.history);
    }

    static defData = {
        picData: ''
    }

    onClickImage = () => {
         document.querySelector('#fileClick').addEventListener('click', function(){
            document.querySelector('input[type="file"]').click();
        })
        
        document.querySelector('input[type="file"]').onchange = function(e){
            Update.defData = e.target.value;
            document.querySelector('input[type="submit"]').click();
        }
    }

    onChangeImage = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('prfl', Update.defData);
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        console.log(formData);

        // this.setState({profilePic: Update.defData});
        // this.props.updatePic(newPic, this.props.history);  
        // Axios.post('http://localhost:5000/profilepic', formData, config)
        //     .then( res => console.log(res))
        //     .catch( err => console.log(err.response));      
    }

    render() {
        console.log(this.props)
        let errorObj = {};
        if(Array.isArray(this.state.errors)){
        this.state.errors.map( error => {
            if(error.param) errorObj[error.param] = ( <small className="text-danger">{error.msg}</small>) 
            return 0;              
         });}


        return (
            <div>
                <Navigation />
                <div className="pt-5 mt-4 container">
                <div className="flex mt-3 mb-3 container">
                <div className="circleImg">
                <img src={`${this.state.profilePic}`} alt="" />
                </div>
                <h5 className="mt-3">{this.state.name} </h5>
                <small id="fileClick"  onClick={this.onClickImage}>change profile pic</small>
                <form className="d-none" method="POST" onSubmit={this.onChangeImage} encType="multipart/form-data">
                <input type="file" name="prfl" onChange={this.onChange} />
                <input type="submit" />
                </form>            
                </div>
                <form id="regForm" method="POST" onSubmit={this.onSubmit}>
                <div className="form-row">
                <div className="form-group col-md-6">
                <label htmlFor="inputname">Name</label>
                <input type="text" name="name" onChange={this.onChange} className="form-control" id="inputname" placeholder="Name" value={`${this.state.name}`} />
                {errorObj.name ? errorObj.name : ''}
                </div>
                <div className="form-group col-md-6">
                <label htmlFor="inputusername">Username</label>
                <input type="text" name="username" onChange={this.onChange} className="form-control" id="inputusername" placeholder="Username" value={`${this.state.username}`} />
                {errorObj.username ? errorObj.username : ''}
                </div>
                </div>
                <div className="form-group">
                <label htmlFor="inputAddress">Something About You <span role="img" aria-labelledby="jsx-a11y/accessible-emoji" >🎭</span> </label>
                <textarea name="about" className="form-control" onChange={this.onChange} id="exampleFormControlTextarea1" rows="3"
                placeholder="What you're good at, ambitions, about you..." defaultValue={this.state.about}></textarea>
                </div>
                <div className="form-row">
                <div className="form-group col-md-4">
                <label htmlFor="inputCity">City</label>
                <input type="text" name="city" className="form-control" onChange={this.onChange} id="inputCity" value={`${this.state.city}`} />
                {errorObj.city ? errorObj.city : ''}
                </div>
                <div className="form-group col-md-8">
                <label htmlFor="inputNumber">Contact Number</label>
                <input type="number" name="phone" className="form-control" onChange={this.onChange} id="inputNumber" value={`${this.state.phone}`} />
                {errorObj.phone ? errorObj.phone : ''}
                </div>
                </div>
                <button className="btn btn-warning">Update Details</button>
                </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});


export default connect(mapStateToProps, { updateUser, updatePic })(Update);