import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { Spinner, LayoutComponent } from './components';
import Dashboard from './screens/dashboard.screen';
import SignIn from './screens/signin.screen';
import SignUp from './screens/signup.screen';
import MonthList from './screens/month-list.screen';
import CategoryList from './screens/category-list.screen';
import CategoryEdit from './screens/category-edit.screen';
import CategoryAdd from './screens/categrory-add.screen';

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
                <LayoutComponent {...this.props}>
                    <Route exact path="/" render={(props) => <Dashboard {...props} />} />
                    <Route exact path="/monthlist" render={(props) => <MonthList {...props} />} />
                    <Route exact path="/categorylist" render={(props) => <CategoryList {...props} />} />
                    <Route exact path="/categorylist/:id" render={(props) => <CategoryEdit {...props} />} />
                    <Route exact path="/category" render={(props) => <CategoryAdd {...props} />} />
                </LayoutComponent>
            )
        }
    }
}

export default SubRouter;
