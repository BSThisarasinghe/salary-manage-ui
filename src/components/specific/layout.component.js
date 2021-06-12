import React, { useEffect, useState } from 'react';
import { Switch, BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import { Spinner, SideBar, HeaderComponent, FooterComponent, BreadcrumbComponent } from '../common';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function LayoutComponent({ children }, props) {

    const history = useHistory();

    const handleRoutes = () => {
        let authenticated = props.authenticated;
        let auth = localStorage.getItem("authenticated");
        if (typeof auth !== undefined && auth !== null) {
            authenticated = auth;
        }
        if (!authenticated) {
            history.push('/signin')
        }
    }

    useEffect(() => {
        handleRoutes();
    }, [])

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <SideBar />
            <Layout className="site-layout">
                <HeaderComponent />
                <Content style={{ margin: '0 16px' }}>
                    <BreadcrumbComponent />
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        {children}
                    </div>
                </Content>
                <FooterComponent />
            </Layout>
        </Layout>
    );
}

export { LayoutComponent };
