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

const signOut = async () => {
    return await axiosInstance({
        method: `delete`,
        url: `${Constants.API_URL}/users/signout`
    });
}

export {
    postSignIn,
    signOut
}