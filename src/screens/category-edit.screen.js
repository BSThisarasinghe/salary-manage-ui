import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import {
    message,
    Form,
    Input,
    Button
} from "antd";
import { getCategory, putCategory } from '../services';

const CategoryEdit = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const history = useHistory();

    const [form] = Form.useForm();
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 8 },
    };

    const setCategory = () => {
        // console.log("#######");
        const categoryId = window.location.pathname.split('/')[2];
        getCategory(categoryId).then((response) => {
            // console.log("####### 1", response.data);
            if (response.status === 200) {
                if (response.data !== null && response.data.category !== null) {
                    // console.log(response.data.category.name);
                    setName(response.data.category.name);
                    setDescription(response.data.category.description);
                    form.setFieldsValue({
                        name: response.data.category.name,
                        description: response.data.category.description
                    });
                }
            }
        }).catch((error) => {
            console.log(error);
            message.error('Oops, error occured while getting category data. Please try again');
        });
    }

    useEffect(() => {
        setCategory();
    }, [])

    const onUpdateCategory = (values) => {
        const categoryId = window.location.pathname.split('/')[2];
        let req = {
            "name": values.name,
            "description": values.description
        }
        putCategory(req, categoryId).then((response) => {
            if (response.status === 200) {
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
                onFinish={onUpdateCategory}
                onFinishFailed={onFinishFailed}
                {...layout}
                size="large"
                initialValues={{
                    'name': name,
                    'description': description
                }}
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
                        onChange={(e) => setName(e.target.value)}
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
                        Update category
                    </Button>
                </Form.Item>
            </Form>
        </React.Fragment>
    )
}

export default CategoryEdit;