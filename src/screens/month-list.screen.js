import React, { useState, useEffect } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { Link, useHistory } from "react-router-dom";
import { message, Spin, Space, Button, Tag } from "antd";
import { confirmAlert } from 'react-confirm-alert';
import { getMonthList, deleteCategory } from '../services';
import { FormOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const MonthList = (props) => {
    const [months, setMonths] = useState([]);
    const history = useHistory();


    const setMonthList = () => {
        getMonthList().then((response) => {
            if (response.status === 200) {
                if (response.data !== null) {
                    setMonths(response.data.monthList);
                }
            }
        }).catch((error) => {
            console.log(error);
            message.error('Oops, error occured while getting month data. Please try again');
        });
    }

    const onConfirmDelete = (id) => {
        deleteCategory(id).then((response) => {
            if (response.status === 200) {
                message.success('Category deleted successfully');
                setMonthList();
            }
        }).catch((error) => {
            console.log(error);
            message.error('Oops, error occured while deleting month data. Please try again');
        });
    }

    const onClickDelete = (id) => {
        confirmAlert({
            message: "Are you sure, you want to delete month?",
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => onConfirmDelete(id)
                },
                {
                    label: 'No',
                }
            ]
        });
    }

    useEffect(() => {
        setMonthList();
    }, [])

    return (
        <div className="screen__backgroound">
            <Link className="btn btn-outline-primary" to={`/month`}>
                <PlusOutlined />
                Add new
            </Link>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Month</th>
                        <th scope="col">Year</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {months.map((value, index) => {
                        return (
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{value.month}</td>
                                <td>{value.year}</td>
                                <td>
                                    <Link className="default__btn" to={`/categorylist/${value.id}`}><FormOutlined style={{ color: '#1890ff' }} /></Link>&nbsp;&nbsp;
                                    <Button className="default__btn" onClick={() => onClickDelete(value.id)}><DeleteOutlined style={{ color: 'red' }} /></Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default MonthList;