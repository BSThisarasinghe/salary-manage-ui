import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import {
    message,
    Form,
    Button,
    DatePicker
} from "antd";
import { getMonth, putMonth } from '../services';
import moment from 'moment';

const MonthEdit = () => {

    const [month, changeMonth] = useState(null);
    const history = useHistory();

    const [form] = Form.useForm();
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 8 },
    };

    const setMonth = () => {
        // console.log("#######");
        const monthId = window.location.pathname.split('/')[2];
        getMonth(monthId).then((response) => {
            // console.log("####### 1", response.data);
            if (response.status === 200) {
                if (response.data !== null && response.data.month !== null) {
                    let month = moment().year(response.data.month.year).format('YYYY') + '-' + moment().month(response.data.month.month).format("M");
                    // console.log(moment().year(response.data.month.year).format('YYYY'), moment().month(response.data.month.month).format("M"));
                    // console.log(month);

                    changeMonth(month);
                    form.setFieldsValue({
                        month: moment(month),
                    });
                }
            }
        }).catch((error) => {
            console.log(error);
            message.error('Oops, error occured while getting month data. Please try again');
        });
    }

    useEffect(() => {
        setMonth();
    }, [])

    const onUpdateMonth = (values) => {
        // console.log(moment(values.month).format('MMMM'));
        // console.log(moment(values.month).format('Y'));

        let req = {
            "month": moment(values.month).format('MMMM'),
            "year": moment(values.month).format('Y')
        }
        const monthId = window.location.pathname.split('/')[2];
        putMonth(req, monthId).then((response) => {
            if (response.status === 200) {
                message.success('Month updated successfully');
                history.push('/monthlist');
            }
        }).catch((error) => {
            console.log(error);
            message.error('Oops, error occured while updating month. Please try again');
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
                onFinish={onUpdateMonth}
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
                        onChange={changeMonth}
                        value={month}
                    />
                </Form.Item>
                <Form.Item shouldUpdate={true}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="btn btn-primary"
                    >
                        Update month
                    </Button>
                </Form.Item>
            </Form>
        </React.Fragment>
    )
}

export default MonthEdit;