
import axios from "axios"
// const {VITE_SERVER_URL} = import.meta.env

const VITE_SERVER_URL = "https://cms-t9bk.onrender.com/api"





export const postRegisterData = async (userData) =>{

    const res = await axios.post(`${VITE_SERVER_URL}/auth/register`, userData)
    return  res.data;
}




export const postLoginUser = async (userData) =>{
    const response = await axios.post(`${VITE_SERVER_URL}/auth/login`, userData)

    return response.data
}