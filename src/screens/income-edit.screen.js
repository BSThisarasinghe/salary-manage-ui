import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import {
    message,
    Form,
    Button,
    PageHeader,
    Input
} from "antd";
import { getIncome, putIncome, deleteIncome } from '../services';
import { DeleteOutlined } from '@ant-design/icons';

const IncomeEdit = () => {

    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const history = useHistory();

    const [form] = Form.useForm();
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 8 },
    };

    const setIncome = () => {
        const incomeId = window.location.pathname.split('/')[2];
        getIncome(incomeId).then((response) => {
            if (response.status === 200) {
                if (response.data !== null && response.data.income !== null) {
                    setName(response.data.income.income);
                    setAmount(response.data.income.amount);
                    form.setFieldsValue({
                        name: response.data.income.income,
                        amount: response.data.income.amount
                    });
                }
            }
        }).catch((error) => {
            console.log(error);
            message.error('Oops, error occured while getting income data. Please try again');
        });
    }

    useEffect(() => {
        setIncome();
    }, [])

    const onUpdateIncome = (values) => {
        let req = {
            "income": values.name,
            "amount": values.amount
        }
        putIncome(req, window.location.pathname.split('/')[2]).then((response) => {
            if (response.status === 200) {
                message.success('Income updated successfully');
                history.push('/');
            }
        }).catch((error) => {
            console.log(error);
            message.error('Oops, error occured while updating income. Please try again');
        });
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        // console.log('State:', name, description);
        // message.error('Oops, error occured while loggin in. Please try again');
    };

    const onDeleteIncome = () => {
        deleteIncome(window.location.pathname.split('/')[2]).then((response) => {
            if (response.status === 200) {
                message.success('Income deleted successfully');
                history.push('/');
            }
        }).catch((error) => {
            console.log(error);
            message.error('Oops, error occured while deleting income. Please try again');
        });
    }

    return (
        <React.Fragment>
            <PageHeader
                className="site-page-header"
                // onBack={() => null}
                title="Edit Income"
            >
                <Button type="primary" danger onClick={onDeleteIncome}>
                    <DeleteOutlined />
                </Button>
            </PageHeader>
            <Form
                form={form}
                name="control-hooks"
                onFinish={onUpdateIncome}
                onFinishFailed={onFinishFailed}
                {...layout}
                size="large"
            >
                <label>Name</label>
                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'You can’t keep this as empty'
                        }
                    ]}
                >
                    <Input
                        placeholder="Category name"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Item>
                <label>Amount</label>
                <Form.Item
                    name="amount"
                    rules={[
                        {
                            required: true,
                            message: 'You can’t keep this as empty'
                        }
                    ]}
                >
                    <Input
                        placeholder="Category name"
                        className="form-control"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </Form.Item>
                <Form.Item shouldUpdate={true}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="btn btn-primary"
                    >
                        Update income
                    </Button>
                </Form.Item>
            </Form>
        </React.Fragment>
    )
}

export default IncomeEdit;