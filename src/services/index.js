import axios from 'axios';
import axiosInstance from '../axios-instance';
import * as Constants from '../constants';

const postSignIn = async (req) => {
    return await axios({
        method: `post`,
        url: `${Constants.API_URL}/users/signin`,
        data: req
    });
}

const postSignUp = async (req) => {
    return await axios({
        method: `post`,
        url: `${Constants.API_URL}/users/signup`,
        data: req
    });
}

const signOut = async () => {
    return await axiosInstance({
        method: `delete`,
        url: `${Constants.API_URL}/users/signout`
    });
}

const checkEmailUnique = async (email) => {
    return await axios({
        method: `get`,
        url: `${Constants.API_URL}/users/checkunique/${email}`
    });
}

const getUserProfile = async () => {
    return await axiosInstance({
        method: `get`,
        url: `${Constants.API_URL}/users/user`
    });
}

const getCategoryList = async () => {
    return await axiosInstance({
        method: `get`,
        url: `${Constants.API_URL}/categories/categorylist`
    });
}

const postCategory = async (req) => {
    return await axiosInstance({
        method: `post`,
        url: `${Constants.API_URL}/categories/category`,
        data: req
    });
}

const getCategory = async (id) => {
    return await axiosInstance({
        method: `get`,
        url: `${Constants.API_URL}/categories/category/${id}`
    });
}

const putCategory = async (req, id) => {
    return await axiosInstance({
        method: `put`,
        url: `${Constants.API_URL}/categories/category/${id}`,
        data: req
    });
}

const deleteCategory = async (id) => {
    return await axiosInstance({
        method: `delete`,
        url: `${Constants.API_URL}/categories/category/${id}`
    });
}

const getMonthList = async () => {
    return await axiosInstance({
        method: `get`,
        url: `${Constants.API_URL}/months/monthlist`
    });
}

const postMonth = async (req) => {
    return await axiosInstance({
        method: `post`,
        url: `${Constants.API_URL}/months/month`,
        data: req
    });
}

const getMonth = async (id) => {
    return await axiosInstance({
        method: `get`,
        url: `${Constants.API_URL}/months/month/${id}`
    });
}

const putMonth = async (req, id) => {
    return await axiosInstance({
        method: `put`,
        url: `${Constants.API_URL}/months/month/${id}`,
        data: req
    });
}

const deleteMonth = async (id) => {
    return await axiosInstance({
        method: `delete`,
        url: `${Constants.API_URL}/months/month/${id}`
    });
}

const getIncomeList = async () => {
    return await axiosInstance({
        method: `get`,
        url: `${Constants.API_URL}/incomes/incomelist`
    });
}

const postIncome = async (req) => {
    return await axiosInstance({
        method: `post`,
        url: `${Constants.API_URL}/incomes/income`,
        data: req
    });
}

const getIncome = async (id) => {
    return await axiosInstance({
        method: `get`,
        url: `${Constants.API_URL}/incomes/income/${id}`
    });
}

const putIncome = async (req, id) => {
    return await axiosInstance({
        method: `put`,
        url: `${Constants.API_URL}/incomes/income/${id}`,
        data: req
    });
}

const deleteIncome = async (id) => {
    return await axiosInstance({
        method: `delete`,
        url: `${Constants.API_URL}/incomes/income/${id}`
    });
}

const getExpenseList = async () => {
    return await axiosInstance({
        method: `get`,
        url: `${Constants.API_URL}/expenses/expenselist`
    });
}

const postExpense = async (req) => {
    return await axiosInstance({
        method: `post`,
        url: `${Constants.API_URL}/expenses/expense`,
        data: req
    });
}

const getExpense = async (id) => {
    return await axiosInstance({
        method: `get`,
        url: `${Constants.API_URL}/expenses/expense/${id}`
    });
}

const putExpense = async (req, id) => {
    return await axiosInstance({
        method: `put`,
        url: `${Constants.API_URL}/expenses/expense/${id}`,
        data: req
    });
}

const deleteExpense = async (id) => {
    return await axiosInstance({
        method: `delete`,
        url: `${Constants.API_URL}/expenses/expense/${id}`
    });
}

const getMonthSummary = async (month_id) => {
    return await axiosInstance({
        method: `get`,
        url: `${Constants.API_URL}/months/monthdetails/${month_id}`
    });
}


export {
    postSignIn,
    postSignUp,
    signOut,
    checkEmailUnique,
    getUserProfile,
    getCategoryList,
    postCategory,
    getCategory,
    putCategory,
    deleteCategory,
    getMonthList,
    postMonth,
    getMonth,
    putMonth,
    deleteMonth,
    getIncomeList,
    postIncome,
    getIncome,
    putIncome,
    deleteIncome,
    getExpenseList,
    postExpense,
    getExpense,
    putExpense,
    deleteExpense,
    getMonthSummary
}