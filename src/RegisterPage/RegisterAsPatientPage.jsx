import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class RegisterAsPatientPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            id: 0,
            message: null,
            intervalIsSet: false,
            idToDelete: null,
            idToUpdate: null,
            objectToUpdate: null,
            patient: {
                firstName: '',
                lastName: '',
                username: '',
                password: '',
                gender:'',
                email:'',
                phoneNo:'',
                dob:''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getDataFromDb = this.getDataFromDb.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { patient } = this.state;
        this.setState({
            patient: {
                ...patient,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        console.log(this.state);
        const { patient } = this.state;
        const { dispatch } = this.props;
        if (patient.firstName && patient.lastName && patient.username && patient.password) {
            dispatch(userActions.register(patient));
        }
    }


    componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      // let interval = setInterval(this.getDataFromDb, 1000);
      // this.setState({ intervalIsSet: interval });
    }
  }

  // never let a process live forever 
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  
  getDataFromDb() {
    fetch("http://localhost:3001/api/getData")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));


  };

    render() {
        const { registering  } = this.props;
        const { patient, submitted,data  } = this.state;
        return (

            <div className="register-container fadeIn">

               <div className="container register">

               

                <div className="row">
                    <div className="col-md-3 register-left">
                        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt=""/>
                        <h3>Welcome</h3>
                        <p>You are 30 seconds away from earning your own money!</p>
                        
                        <Link to="/login" className="btn btn-link">Login</Link>
                        <br/>
                    </div>
                    <div className="col-md-9 register-right">
                        <ul className="nav nav-tabs nav-justified" >
                            <li className="nav-item">
                                <a className="nav-link active" >Patient</a>

                            </li>
                            <li className="nav-item">
                                <Link to="/doctor-registration" className="nav-link ">Doctor</Link>
                            </li>
                        </ul>
                        <div className="tab-content" >
                            <div className="tab-pane fade show active" >
                             <form name="form" onSubmit={this.handleSubmit}>
                                <h3 className="register-heading">Register as a Patient</h3>
                                <div className="row register-form">
                                    <div className="col-md-6">
                                        <div className={'form-group' + (submitted && !patient.firstName ? ' has-error' : '')}>
                                            <input type="text" className="form-control" name="firstName" placeholder="First Name *" value={patient.firstName} onChange={this.handleChange} />
                                        </div>
                                       
                                        <div className={'form-group' + (submitted && !patient.lastName ? ' has-error' : '')}>
                                            <input type="text" className="form-control" name="lastName" placeholder="Last Name *" value={patient.lastName} onChange={this.handleChange} />
                                        </div>

                                         <div className={'form-group' + (submitted && !patient.username ? ' has-error' : '')}>
                                            <input type="text" className="form-control" name="username" placeholder="User Name *" value={patient.username} onChange={this.handleChange} />
                                        </div>
                                        
                                        <div className={'form-group' + (submitted && !patient.password ? ' has-error' : '')}>
                                            <input type="password" className="form-control" name="password" placeholder="Password *" value={patient.password} onChange={this.handleChange} />
                                        </div>
                                      
                                        <div className="form-group">
                                            <div className="maxl">
                                                <label className="radio inline"> 
                                                    <input type="radio" name="gender" value="male" defaultChecked onChange={this.handleChange}/>
                                                    <span> Male </span> 
                                                </label>
                                                <label className="radio inline"> 
                                                    <input type="radio" name="gender" value="female" onChange={this.handleChange}/>
                                                    <span>Female </span> 
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className={'form-group' + (submitted && !patient.email ? ' has-error' : '')}>
                                            <input type="email" className="form-control" name="email" placeholder="Your Email *" value={patient.email} onChange={this.handleChange} />
                                        </div>
                                        <div className={'form-group' + (submitted && !patient.phoneNo ? ' has-error' : '')}>
                                            <input type="text"  name="phoneNo" className="form-control" placeholder="Your Phone *" value={patient.phoneNo} onChange={this.handleChange} />
                                        </div>
                                        
                                        <div className={'form-group' + (submitted && !patient.dob ? ' has-error' : '')}>
                                            <input type="text" className="form-control" name="dob" placeholder="Enter Your DOB" value={patient.dob} onChange={this.handleChange} />
                                        </div>
                                        <button type="submit" className="btnRegister"  value="Register">Register</button>

                                        {registering && <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />}
                                    </div>
                                </div>
                                </form>
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

const connectedRegisterAsPatientPage = connect(mapStateToProps)(RegisterAsPatientPage);
export { connectedRegisterAsPatientPage as RegisterAsPatientPage };


// <input type="submit" name="" value="Login"/>
// <div classNameName="col-md-6 col-md-offset-3">
//                 <h2>Register</h2>
//                 <form name="form" onSubmit={this.handleSubmit}>
//                     <div classNameName={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
//                         <label htmlFor="firstName">First Name</label>
//                         <input type="text" classNameName="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} />
//                         {submitted && !user.firstName &&
//                             <div classNameName="help-block">First Name is required</div>
//                         }
//                     </div>
//                     <div classNameName={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
//                         <label htmlFor="lastName">Last Name</label>
//                         <input type="text" classNameName="form-control" name="lastName" value={user.lastName} onChange={this.handleChange} />
//                         {submitted && !user.lastName &&
//                             <div classNameName="help-block">Last Name is required</div>
//                         }
//                     </div>
//                     <div classNameName={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
//                         <label htmlFor="username">Username</label>
//                         <input type="text" classNameName="form-control" name="username" value={user.username} onChange={this.handleChange} />
//                         {submitted && !user.username &&
//                             <div classNameName="help-block">Username is required</div>
//                         }
//                     </div>
//                     <div classNameName={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
//                         <label htmlFor="password">Password</label>
//                         <input type="password" classNameName="form-control" name="password" value={user.password} onChange={this.handleChange} />
//                         {submitted && !user.password &&
//                             <div classNameName="help-block">Password is required</div>
//                         }
//                     </div>
//                     <div classNameName="form-group">
//                         <button classNameName="btn btn-primary">Register</button>
//                         {registering && 
//                             <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
//                         }
//                         <Link to="/login" classNameName="btn btn-link">Cancel</Link>
//                     </div>
//                 </form>
//             </div>