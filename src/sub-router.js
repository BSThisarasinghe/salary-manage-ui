import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { Spinner, LayoutComponent } from './components';
import Dashboard from './screens/dashboard.screen';
import SignIn from './screens/signin.screen';
import SignUp from './screens/signup.screen';
import MonthList from './screens/month-list.screen';
import MonthAdd from './screens/month-add.screen';
import MonthEdit from './screens/month-edit.screen';
import CategoryList from './screens/category-list.screen';
import CategoryEdit from './screens/category-edit.screen';
import CategoryAdd from './screens/categrory-add.screen';
import IncomeAdd from './screens/income-add.screen';
import IncomeEdit from './screens/income-edit.screen';
import ExpenseAdd from './screens/expense-add.screen';
import ExpenseEdit from './screens/expense-edit.screen';
import MonthSummaryDetails from './screens/month-summary-details.screen';

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
                    <Route exact path="/month" render={(props) => <MonthAdd {...props} />} />
                    <Route exact path="/monthlist/:id" render={(props) => <MonthEdit {...props} />} />
                    <Route exact path="/categorylist" render={(props) => <CategoryList {...props} />} />
                    <Route exact path="/categorylist/:id" render={(props) => <CategoryEdit {...props} />} />
                    <Route exact path="/category" render={(props) => <CategoryAdd {...props} />} />
                    <Route exact path="/income/:id" render={(props) => <IncomeAdd {...props} />} />
                    <Route exact path="/income-edit/:id" render={(props) => <IncomeEdit {...props} />} />
                    <Route exact path="/expense/:id" render={(props) => <ExpenseAdd {...props} />} />
                    <Route exact path="/expense-edit/:id" render={(props) => <ExpenseEdit {...props} />} />
                    <Route exact path="/month/:id" render={(props) => <MonthSummaryDetails {...props} />} />
                </LayoutComponent>
            )
        }
    }
}

export default SubRouter;
