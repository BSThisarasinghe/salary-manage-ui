import React, { useState, useEffect } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { message, Spin, Space } from "antd";
import { LayoutComponent } from "../components";

const MonthList = (props) => {
    return (
        <LayoutComponent {...props}>
            <div>
                Months
            </div>
        </LayoutComponent>
    )
}

export default MonthList;