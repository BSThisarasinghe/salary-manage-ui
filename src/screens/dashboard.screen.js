import React, { useState, useEffect } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { Link } from "react-router-dom";
import { message, Spin, Card } from "antd";
import { LayoutComponent } from "../components";
import { getMonthSummary } from "../services";

const Dashboard = (props) => {

    const [month, setMonth] = useState('');
    const [income, setIncome] = useState('');
    const [expense, setExpense] = useState('');
    const [monthdetails, setMonthDetails] = useState([]);

    const calculateIncomeSum = (array) => {
        return array.reduce((n, { amount }) => n + parseFloat(amount), 0);
    }

    const calculateExpenseSum = (array) => {
        let total = 0;
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[i].expenses.length; j++) {
                total += parseFloat(array[i].expenses[j].amount);
            }
        }
        return total;
    }

    const setMonthSummary = () => {
        getMonthSummary('LATEST').then((response) => {
            if (response.status === 200) {
                if (response.data !== null && Array.isArray(response.data.data) && response.data.data.length > 0) {
                    console.log(response.data.data);
                    setMonth(response.data.data[0].month + ' ' + response.data.data[0].year);
                    setIncome(calculateIncomeSum(response.data.data[0].incomes));
                    setExpense(calculateExpenseSum(response.data.data[0].categories));
                    setMonthDetails(response.data.data);
                }
            }
        }).catch((error) => {
            console.log(error);
            message.error('Oops, error occured while getting month data. Please try again');
        });
    }

    useEffect(() => {
        setMonthSummary();
    }, []);

    return (
        <div className="screen__backgroound">
            <div className="row">
                <div className="col-md-6">
                    <Card className="dashboard__header__card">
                        <h6>OVERVIEW</h6>
                        <p>{month}</p>
                        <div>
                            {income} - {expense} = {income - expense}
                        </div>
                    </Card>
                </div>
                <div className="col-md-6">
                    <Card className="dashboard__header__card button__container">
                        {Array.isArray(monthdetails) && monthdetails.length > 0 &&
                            <>
                                <Link className="btn btn-primary" to={`/income/${monthdetails[0].id}`}>Add income</Link>&nbsp;&nbsp;
                                <Link className="btn btn-secondary" to={'/expense'}>Add expense</Link>
                            </>}
                    </Card>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <Card>
                        {Array.isArray(monthdetails) && monthdetails.length > 0 && Array.isArray(monthdetails[0].incomes) && monthdetails[0].incomes.map((value, index) => {
                            return (
                                <>
                                    <Link>{value.income}</Link>: {value.amount}
                                    <br />
                                </>
                            )
                        })}
                    </Card>
                </div>
            </div>
            <div className="row">
                {Array.isArray(monthdetails) && monthdetails.length > 0 && Array.isArray(monthdetails[0].categories) && monthdetails[0].categories.map((value, index) => {
                    return (
                        <div className="col-md-4">
                            <Card>
                                {value.name}
                                {calculateIncomeSum(value.expenses)}
                                <table>
                                    <thead>
                                        <th>Expense</th>
                                        <th>Amount</th>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(value.expenses) && value.expenses.map((value, index) => {
                                            return (
                                                <tr>
                                                    <td><input type="checkbox" checked={value.paid} /><Link>{value.expense}</Link></td>
                                                    <td>{value.amount}</td>
                                                </tr>
                                            )
                                        })}
                                        <tr>
                                            <td>Total</td>
                                            <td>{calculateIncomeSum(value.expenses)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Card>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Dashboard;