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

export {
    postSignIn,
    postSignUp,
    signOut,
    checkEmailUnique,
    getUserProfile,
    getCategoryList,
    postCategory
}