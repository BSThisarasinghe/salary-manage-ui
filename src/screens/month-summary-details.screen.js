import React, { useState, useEffect } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { Link } from "react-router-dom";
import { message, Spin, Card } from "antd";
import { MonthSummary } from "../components";
import { getMonthSummary } from "../services";

const MonthSummaryDetails = () => {

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
        const monthId = window.location.pathname.split('/')[2];
        getMonthSummary(monthId).then((response) => {
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
            <MonthSummary
                income={income}
                expense={expense}
                monthdetails={monthdetails}
                month={month}
                calculateIncomeSum={calculateIncomeSum}
            />
        </div>
    )
}

export default MonthSummaryDetails;