import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterAsPatientPage,RegisterAsDoctorPage } from '../RegisterPage';

class App extends React.Component {
    constructor(props) {
        super(props);
       
        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    componentDidMount () {
        // const { dispatch } = this.props;
        // setTimeout(function () {
        //    dispatch(alertActions.clear());
        // }.bind(this), 7000);
   } 

  componentWillUnmount () {
    // if (this.state.timeoutId) {
    //     clearTimeout(this.state.timeoutId);
    // }
  }

    render() {
        const { alert } = this.props;

        return (
            // <div className="jumbotron">
            //     <div className="container">
            //         <div className="col-sm-8 col-sm-offset-2">
                        
                        <Router history={history}>
                            <div className="wrapper">
                                {alert.message &&
                                    // <div className={`alert ${alert.type}`}>{alert.message}</div>

                                    <div id="toast" className={'alert show '  + (alert.type)}><div id="img">Icon</div><div id="desc">{alert.message}</div></div>
                                }
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/patient-registration" component={RegisterAsPatientPage} />
                                <Route path="/doctor-registration" component={RegisterAsDoctorPage} />
                            </div>
                        </Router>
            //     </div>
            // </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 