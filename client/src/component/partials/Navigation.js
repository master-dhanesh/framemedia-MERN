import React, { Component } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../store/actions/authAction';
import HOC from '../HOC/HOC';    
// import Loader from '../Loader/Loader';

class Navigation extends Component {

    state= {
        user: this.props.auth.user,
        isAuthenticated: this.props.auth.isAuthenticated,
        errors: this.props.errors
    }

    logoutHandle = (e) => {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        return (
            <div>
                <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div className="modal-body">
                ...
                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
                </div>
                </div>
                </div>
                </div>

                <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
                <div className="container">
                <Link className="navbar-brand" to="#">Freeko</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                <li className="nav-item active">
                <Link className="nav-link" to={`${ this.state.isAuthenticated ? '/timeline' : '/' }`}>Home <span className="sr-only">(current)</span></Link>
                </li>
                { this.state.isAuthenticated ? 
                    <HOC>
                    <li className="nav-item">
                    <Link className="nav-link" to="/timeline">Timeline</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/profile">Profile</Link>
                    </li>
                    </HOC>
                    :
                    '' }
                </ul>
                <ul className="navbar-nav ml-auto">

                { this.state.isAuthenticated ?
                    <HOC>
                     <li className="nav-item">
                     <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                     <i className="fa fa-comment"></i> Hidden Comments
                     </button>
                     </li>
                     <li className="nav-item">
                     <button className="btn btn-primary"><i className="fa fa-bell"></i> Notification</button>
                     </li>
                     </HOC>
                     : 
                     '' }                  

                { this.state.isAuthenticated ? 
                     <li className="nav-item">
                     <Link to="" className="nav-link active" onClick={this.logoutHandle} >
                    
                         <img
                            style={{ height: '25px' }}
                            className="rounded-circle" 
                            src={ `${this.state.user.profilePic}`} 
                            alt="network error"
                            />

                            {' '}
                         Logout
                         </Link>                         
                     </li>
                    :
                    <li className="nav-item">
                    <NavLink className="nav-link active" to="/register">Login or Signup</NavLink>
                    </li>
                }

                </ul>
                </div>
                </div>
                </nav>

            </div>
        )
    }
}

Navigation.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Navigation));