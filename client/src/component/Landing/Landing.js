import React, { Component } from 'react';
import Navigation from '../partials/Navigation';
import { Link } from 'react-router-dom';
import '../../App.css';

class Landing extends Component {
    render() {
        return (
            <div>
                <Navigation />
                <div className="pt-5 mt-3 jumbotron jumbotron-fluid">
                <div className="container">
                <h1 className="display-4">Freeko,</h1>
                <p className="lead"> The Lightning Fast Mini Social Media App.</p>
                <Link className="btn btn-primary" to="#">Check Out Now</Link>
                </div>
                </div>
                <div className="container pt-1 pb-5">
                <h1 className="display-5">How Are We Better ?</h1>
                <p className="lead-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam sint dolore necessitatibus inventore tenetur porro beatae laboriosam incidunt, nemo corrupti ad quo illo! Eos impedit ducimus eaque rem vitae ad repellat aut praesentium facere? Ipsa dignissimos accusantium maiores accusamus saepe perferendis labore temporibus, blanditiis distinctio. Delectus, corporis quos reiciendis quibusdam maxime quia iste odit, ratione asperiores excepturi quod, placeat et.</p>
                <Link className="btn btn-success" to="#">Let me use this app</Link>
                </div>
            </div>
        )
    }
}

export default Landing;
