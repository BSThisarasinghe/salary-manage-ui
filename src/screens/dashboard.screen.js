import React, { useState, useEffect } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { message, Spin, Space } from "antd";
import { LayoutComponent } from "../components";

const Dashboard = (props) => {
    return (
        <LayoutComponent {...props}>
            <div>
                Hello world!
            </div>
        </LayoutComponent>
    )
}

export default Dashboard;