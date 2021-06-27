import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import {
    message,
    Form,
    Input,
    Button
} from "antd";
import { postCategory } from '../services';

const CategoryAdd = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const history = useHistory();

    const [form] = Form.useForm();
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 8 },
    };

    const onChangeName = (e) => {
        setName(e.target.value);
        console.log(name);
    }

    const onAddCategory = (values) => {
        let req = {
            "name": values.name,
            "description": values.description
        }
        postCategory(req).then((response) => {
            if (response.status === 201) {
                message.success('Category created successfully');
                history.push('/categorylist');
            }
        }).catch((error) => {
            console.log(error);
            message.error('Oops, error occured while adding category. Please try again');
        });
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        console.log('State:', name, description);
        // message.error('Oops, error occured while loggin in. Please try again');
    };

    return (
        <React.Fragment>
            <Form
                form={form}
                name="control-hooks"
                onFinish={onAddCategory}
                onFinishFailed={onFinishFailed}
                {...layout}
                size="large"
            >
                <label>Category name</label>
                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'You can’t keep this as empty'
                        }, {
                            max: 100,
                            message: 'The category name is too lengthy.',
                        }
                    ]}
                >
                    <Input
                        placeholder="Category name"
                        className="form-control"
                        value={name}
                        onChange={onChangeName}
                    />
                </Form.Item>
                <label>Description</label>
                <Form.Item
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'You can’t keep this as empty'
                        }, {
                            max: 250,
                            message: 'The description is too lengthy',
                        }
                    ]}
                >
                    <Input.TextArea
                        placeholder="Description"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Item>
                <Form.Item shouldUpdate={true}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="btn btn-primary"
                    >
                        Add category
                    </Button>
                </Form.Item>
            </Form>
        </React.Fragment>
    )
}

export default CategoryAdd;