import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class RegisterAsDoctorPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            doctor: {
                firstName: '',
                lastName: '',
                username: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { doctor } = this.state;
        this.setState({
            doctor: {
                ...doctor,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { doctor } = this.state;
        const { dispatch } = this.props;
        if (doctor.firstName && doctor.lastName && doctor.username && doctor.password) {
            dispatch(userActions.register(doctor));
        }
    }

    render() {
        const { registering  } = this.props;
        const { doctor, submitted } = this.state;
        return (

                        <div className="register-container fadeIn">

               <div className="container register">
                <div className="row">
                    <div className="col-md-3 register-left">
                        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt=""/>
                        <h3>Welcome</h3>
                        <p>You are 30 seconds away from earning your own money!</p>
                        <Link to="/login" className="btn btn-link">Login</Link><br/>
                    </div>
                    <div className="col-md-9 register-right">
                        <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
                            <li className="nav-item">
                               <Link to="/patient-registration" className="nav-link">Patient</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" >Doctor</a>
                            </li>
                        </ul>
                        <div className="tab-content" >
                            
                            <div className="tab-pane fade show active" >
                                <h3  className="register-heading">Register as a Doctor</h3>
                                <div className="row register-form">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="First Name *" value="" />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Last Name *" value="" />
                                        </div>
                                        <div className="form-group">
                                            <input type="email" className="form-control" placeholder="Email *" value="" />
                                        </div>
                                        <div className="form-group">
                                            <input type="text"  className="form-control" placeholder="Phone *" value="" />
                                        </div>


                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="password" className="form-control" placeholder="Password *" value="" />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control" placeholder="Confirm Password *" value="" />
                                        </div>
                                        <div className="form-group">
                                            <select className="form-control">
                                                <option className="hidden"  selected disabled>Please select your Sequrity Question</option>
                                                <option>What is your Birthdate?</option>
                                                <option>What is Your old Phone Number</option>
                                                <option>What is your Pet Name?</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="`Answer *" value="" />
                                        </div>
                                        <input type="submit" className="btnRegister"  value="Register"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
</div>
            
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedRegisterAsDoctorPage = connect(mapStateToProps)(RegisterAsDoctorPage);
export { connectedRegisterAsDoctorPage as RegisterAsDoctorPage };

