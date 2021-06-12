import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Spinner, SideBar, HeaderComponent, FooterComponent, BreadcrumbComponent } from './components';
import Dashboard from './screens/dashboard.screen';
import SignIn from './screens/signin.screen';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class SubRouter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: props.loading
        }
    }

    onPressLogout = () => {
        confirmAlert({
            message: "Are you sure you want to logout?",
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.onConfirmLogout()
                },
                {
                    label: 'No',
                }
            ]
        });
    }

    onConfirmLogout = () => {
        let clearState = new Promise(async (resolve, reject) => {
            this.setState({
                loading: true
            }, async function () {
                await localStorage.clear();
            });
            resolve(true);
        });
        clearState.then(() => {
            this.props.keycloak.logout();
        })
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
                </>
            )
        }
    }
}

export default SubRouter;
