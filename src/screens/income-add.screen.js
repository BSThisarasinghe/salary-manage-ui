import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import {
    message,
    Form,
    Button,
    DatePicker,
    Input
} from "antd";
import { postIncome } from '../services';
import moment from 'moment';

const IncomeAdd = () => {

    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const history = useHistory();

    const [form] = Form.useForm();
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 8 },
    };

    const onAddIncome = (values) => {
        let req = {
            "income": values.name,
            "amount": values.amount,
            "month_id": parseInt(window.location.pathname.split('/')[2])
        }
        postIncome(req).then((response) => {
            if (response.status === 201) {
                message.success('Income created successfully');
                history.push('/');
            }
        }).catch((error) => {
            console.log(error);
            message.error('Oops, error occured while adding income. Please try again');
        });
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        // console.log('State:', name, description);
        // message.error('Oops, error occured while loggin in. Please try again');
    };

    return (
        <React.Fragment>
            <Form
                form={form}
                name="control-hooks"
                onFinish={onAddIncome}
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
                        Add income
                    </Button>
                </Form.Item>
            </Form>
        </React.Fragment>
    )
}

export default IncomeAdd;