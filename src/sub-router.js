import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { Spinner } from './components';
import Dashboard from './screens/dashboard.screen';
import SignIn from './screens/signin.screen';
import SignUp from './screens/signup.screen';
import MonthList from './screens/month-list.screen';
import CategoryList from './screens/category-list.screen';

class SubRouter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: props.loading
        }
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="spinner_container">
                    <Spinner />
                </div>
            );
        } else {
            return (
                <>
                    <Route exact path="/" render={(props) => <Dashboard {...props} />} />
                    <Route exact path="/signin" render={(props) => <SignIn {...props} />} />
                    <Route exact path="/signup" render={(props) => <SignUp {...props} />} />
                    <Route exact path="/monthlist" render={(props) => <MonthList {...props} />} />
                    <Route exact path="/categorylist" render={(props) => <CategoryList {...props} />} />
                </>
            )
        }
    }
}

export default SubRouter;
