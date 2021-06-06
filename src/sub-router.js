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

import Dashboard from './screens/dashboard.screen';
import { Spinner, SideBar, HeaderComponent, FooterComponent, BreadcrumbComponent } from './components';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class SubRouter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            logoutLoading: false,
        }
    }

    componentDidMount() {
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
                logoutLoading: true
            }, async function () {
                await localStorage.clear();
            });
            resolve(true);
        });
        clearState.then(() => {
            this.props.keycloak.logout();
        })
    }

    renderRoutes() {
        if (this.state.logoutLoading) {
            return (
                <div className="spinner_container">
                    <Spinner />
                </div>
            );
        } else {
            return (
                <>
                    <Route exact path="/" render={(props) => <Dashboard {...props} />} />
                </>
            )
        }
    }

    render() {
        const { collapsed } = this.state;
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <SideBar />
                <Layout className="site-layout">
                    <HeaderComponent />
                    <Content style={{ margin: '0 16px' }}>
                        <BreadcrumbComponent />
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            {this.renderRoutes()}
                        </div>
                    </Content>
                    <FooterComponent />
                </Layout>
            </Layout>
        );
    }
}

export default SubRouter;
