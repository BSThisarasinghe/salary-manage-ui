import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import {
    message,
    Form,
    Button,
    Select,
    Checkbox,
    Input
} from "antd";
import { postExpense, getCategoryList } from '../services';

const { Option } = Select;

const ExpenseAdd = () => {

    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [paidChecked, setPaid] = useState(false);

    const [categories, setCategories] = useState([]);
    const history = useHistory();

    const [form] = Form.useForm();
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 8 },
    };

    const onAddExpennse = (values) => {
        let req = {
            "expense": values.name,
            "amount": values.amount,
            "category_id": values.category,
            "month_id": parseInt(window.location.pathname.split('/')[2]),
            "paid": paidChecked
        }
        console.log("request", req);
        postExpense(req).then((response) => {
            if (response.status === 201) {
                message.success('Expense created successfully');
                history.push('/');
            }
        }).catch((error) => {
            console.log(error);
            message.error('Oops, error occured while adding expense. Please try again');
        });
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        // console.log('State:', name, description);
        // message.error('Oops, error occured while loggin in. Please try again');
    };

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

    const onChangePaid = (e) => {
        setPaid(!paidChecked);
    }

    useEffect(() => {
        setCategoryList();
    }, [])

    return (
        <React.Fragment>
            <Form
                form={form}
                name="control-hooks"
                onFinish={onAddExpennse}
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
                        placeholder="Expense name"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Item>
                <label>Category</label>
                <Form.Item
                    name="category"
                    rules={[
                        {
                            required: true,
                            message: 'You can’t keep this as empty'
                        }
                    ]}
                >
                    <Select
                        placeholder="Select a category"
                        value={category}
                        onChange={setCategory}
                    >
                        {categories.map((value, index) => {
                            return (
                                <Option value={value.id}>{value.name}</Option>
                            )
                        })}
                    </Select>
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
                        placeholder="Expense amount"
                        className="form-control"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </Form.Item>
                <Form.Item
                    name="status"
                >
                    <Checkbox checked={paidChecked} onChange={onChangePaid}>Paid</Checkbox>
                </Form.Item>
                <Form.Item shouldUpdate={true}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="btn btn-primary"
                    >
                        Add expense
                    </Button>
                </Form.Item>
            </Form>
        </React.Fragment>
    )
}

export default ExpenseAdd;