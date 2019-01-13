import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class HomePage extends React.Component {

    componentDidMount() {
        this.props.dispatch(userActions.getAll());
        // console.log(this.props);
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    render() {
        const { user, users } = this.props;
        // console.log(users);
        return (
            <div className="container fadeIn">
            <div className="row">
            <div className="col-md-12">
                 <br/>
                <h1>Hi {user.firstName}!</h1>
                <br/>
                <p>You're logged in with React!!</p>
                <h5>All registered users:</h5>
                <br/>

                <table className="table">
                <thead className="thead-light">
                <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">FirstName</th>
                <th scope="col">LastName</th>
                 <th scope="col">Mobile</th>
                <th scope="col">Email</th>
                <th scope="col">Gender</th>
                <th scope="col">DOB</th>
               
                </tr>
                </thead>
            {users.loading && <tbody><tr><td colSpan="8"><em>Loading users...</em></td></tr></tbody>}
            {users.error &&  <tbody><tr><td colSpan="8"><span className="text-danger">ERROR: {users.error}</span></td></tr></tbody>}
            {users.items &&
                <tbody>
             {users.items.map((user, index) =>
                <tr key={user._id}>
                <th scope="row">{index+1}</th>
                <td>{user.username}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <th scope="row">{user.phoneNo}</th>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.dob}</td>
                </tr>
             )}
                </tbody>
            }
                </table>
                <br/><br/>
                <p>
                    <Link to="/login" className="btn btn-primary float-right">Logout</Link>
                </p>
            </div>
            </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };

// {users.loading && <em>Loading users...</em>}
//                 {users.error && <span className="text-danger">ERROR: {users.error}</span>}
//                 {users.items &&
//                     <ul>
//                         {users.items.map((user, index) =>
//                             <li key={user.id}>
//                                 {user.firstName + ' ' + user.lastName}
//                                 {
//                                     user.deleting ? <em> - Deleting...</em>
//                                     : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
//                                     : <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
//                                 }
//                             </li>
//                         )}
//                     </ul>
//                 }