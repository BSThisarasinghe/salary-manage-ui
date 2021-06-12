import React, { useEffect, useState } from 'react';
import { Switch, BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Button, message } from 'antd';
import { confirmAlert } from 'react-confirm-alert';
import { Spinner, SideBar, HeaderComponent, FooterComponent, BreadcrumbComponent } from '../common';
import { signOut } from '../../services';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function LayoutComponent({ children }, props) {

    const [loading, setLoading] = useState(false);
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

    const onPressLogout = () => {
        confirmAlert({
            message: "Are you sure you want to logout?",
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => onConfirmLogout()
                },
                {
                    label: 'No',
                }
            ]
        });
    }

    const onConfirmLogout = () => {
        setLoading(true);
        signOut().then(async () => {
            await localStorage.clear();
            handleRoutes();
        }).catch((error) => {
            console.log(error);
            setLoading(false);
            message.error('Oops, error occured while logging out. Please try again');
        });
    }

    useEffect(() => {
        handleRoutes();
    }, [])

    return (
        <React.Fragment>
            {loading ? <div className="spinner_container">
                < Spinner />
            </div > : <Layout style={{ minHeight: '100vh' }}>
                <SideBar onLogout={onPressLogout} />
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
            }
        </React.Fragment>
    );
}

export { LayoutComponent };
