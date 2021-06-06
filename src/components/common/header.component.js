import React from 'react';
import { Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Button } from 'antd';

const { Header } = Layout;

const HeaderComponent = () => {
    return (
        <Header className="site-layout-background" style={{ padding: 0 }} >
            {/* <Button key="1" type="primary">
                Primary
            </Button> */}
        </Header>
    )
}

export { HeaderComponent };