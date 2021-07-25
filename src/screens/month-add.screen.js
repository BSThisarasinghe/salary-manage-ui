import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import {
    message,
    Form,
    Button,
    DatePicker
} from "antd";
import { postMonth } from '../services';
import moment from 'moment';

const MonthAdd = () => {

    const [month, setMonth] = useState(null);
    const history = useHistory();

    const [form] = Form.useForm();
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 8 },
    };

    const onAddMonth = (values) => {
        // console.log(moment(values.month).format('MMMM'));
        // console.log(moment(values.month).format('Y'));

        let req = {
            "month": moment(values.month).format('MMMM'),
            "year": moment(values.month).format('Y')
        }
        postMonth(req).then((response) => {
            if (response.status === 201) {
                message.success('Month created successfully');
                history.push('/monthlist');
            }
        }).catch((error) => {
            console.log(error);
            message.error('Oops, error occured while adding month. Please try again');
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
                onFinish={onAddMonth}
                onFinishFailed={onFinishFailed}
                {...layout}
                size="large"
            >
                <label>Month and Year</label>
                <Form.Item
                    name="month"
                    rules={[
                        {
                            required: true,
                            message: 'You can’t keep this as empty'
                        }
                    ]}
                >
                    <DatePicker
                        picker={'month'}
                        onChange={setMonth}
                        value={month}
                    />
                </Form.Item>
                <Form.Item shouldUpdate={true}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="btn btn-primary"
                    >
                        Add month
                    </Button>
                </Form.Item>
            </Form>
        </React.Fragment>
    )
}

export default MonthAdd;