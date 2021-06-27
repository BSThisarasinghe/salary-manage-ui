import React, { useState, useEffect } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { message, Spin, Space, Button, Tag } from "antd";
import { getCategoryList } from '../services';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';

const CategoryEdit = () => {

    const [categories, setCategories] = useState([]);

    const setCategoryList = () => {
        getCategoryList().then((response) => {
            if (response.status === 200) {
                if (response.data !== null) {
                    setCategories(response.data.categoryList);
                }
            }
        }).catch((error) => {
            console.log(error);
            message.error('Oops, error occured while getting category data. Please try again');
        });
    }

    useEffect(() => {
        setCategoryList();
    }, [])

    return (
        <React.Fragment>
            Category
        </React.Fragment>
    )
}

export default CategoryEdit;