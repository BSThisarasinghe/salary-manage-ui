import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import {
    message,
    Form,
    Button,
    Select,
    Checkbox,
    Input,
    PageHeader
} from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import { putExpense, getCategoryList, getExpense, deleteExpense } from '../services';

const { Option } = Select;

const ExpenseEdit = () => {

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

    const setExpense = () => {
        const incomeId = window.location.pathname.split('/')[2];
        getExpense(incomeId).then((response) => {
            if (response.status === 200) {
                if (response.data !== null && response.data.expense !== null) {
                    setName(response.data.expense.expense);
                    setAmount(response.data.expense.amount);
                    setCategory(response.data.expense.category_id);
                    setPaid(response.data.expense.paid);
                    form.setFieldsValue({
                        name: response.data.expense.expense,
                        amount: response.data.expense.amount,
                        category: response.data.expense.category_id,
                        status: response.data.expense.paid
                    });
                }
            }
        }).catch((error) => {
            console.log(error);
            message.error('Oops, error occured while getting expense data. Please try again');
        });
    }

    const onUpdateExpennse = (values) => {
        let req = {
            "expense": values.name,
            "amount": values.amount,
            "category_id": values.category,
            "paid": paidChecked
        }
        // console.log("request", req);
        putExpense(req, window.location.pathname.split('/')[2]).then((response) => {
            if (response.status === 200) {
                message.success('Expense updated successfully');
                history.push('/');
            }
        }).catch((error) => {
            console.log(error);
            message.error('Oops, error occured while updating expense. Please try again');
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
                    setExpense();
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

    const onDeleteExpense = () => {
        deleteExpense(window.location.pathname.split('/')[2]).then((response) => {
            if (response.status === 200) {
                message.success('expense deleted successfully');
                history.push('/');
            }
        }).catch((error) => {
            console.log(error);
            message.error('Oops, error occured while deleting expense. Please try again');
        });
    }

    return (
        <React.Fragment>
             <PageHeader
                className="site-page-header"
                // onBack={() => null}
                title="Edit expense"
            >
                <Button type="primary" danger onClick={onDeleteExpense}>
                    <DeleteOutlined />
                </Button>
            </PageHeader>
            <Form
                form={form}
                name="control-hooks"
                onFinish={onUpdateExpennse}
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
                        Update expense
                    </Button>
                </Form.Item>
            </Form>
        </React.Fragment>
    )
}

export default ExpenseEdit;