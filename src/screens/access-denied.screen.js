import React, { Component } from "react";
import { FooterComponent } from '../components';
// import AccessDeniedIcon from '../assets/images/access-denied.svg';

class AccessDenied extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="container main">
                    <div className="main__wrapper col">
                        <div className="row">
                            <div className="idea__card access__messages denied">
                                {/* <img src={AccessDeniedIcon} className="img-fluid" alt="Access denied" /> */}
                                <h3 className="access__title">Your Access Denied!</h3>
                                <h6 className="access__description">Your don't currenty have permission to access this account. Please check with your Organization Admin or Create a New IdeabizMeet Account or Go to Home</h6>
                                <button className="btn btn-sm" onClick={this.props.onLogout}><i class="las la-sign-out-alt"></i>&nbsp;Logout</button>
                            </div>
                        </div>
                    </div>
                    <FooterComponent />
                </div>
            </React.Fragment>
        );
    }
}

export default AccessDenied


