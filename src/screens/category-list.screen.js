import React, { useState, useEffect } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { Link, useHistory } from "react-router-dom";
import { message, Spin, Space, Button, Tag } from "antd";
import { getCategoryList } from '../services';
import { FormOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const CategoryList = () => {

    const [categories, setCategories] = useState([]);
    const history = useHistory();


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
        <div className="screen__backgroound">
            <Link className="btn btn-outline-primary" to={`/category`}>
                <PlusOutlined />
                Add new
            </Link>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Category</th>
                        <th scope="col">Description</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((value, index) => {
                        return (
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{value.name}</td>
                                <td>{value.description}</td>
                                <td>
                                    <Link className="default__btn" to={`/categorylist/${value.id}`}><FormOutlined style={{ color: '#1890ff' }} /></Link>&nbsp;&nbsp;
                                    <Button className="default__btn"><DeleteOutlined style={{ color: 'red' }} /></Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default CategoryList;