
import axios from "axios"
const {VITE_SERVER_URL} = import.meta.env

console.log(VITE_SERVER_URL)





export const postRegisterData = async (userData) =>{

    const res = await axios.post(`${VITE_SERVER_URL}register`, userData)
    return  res.data;
}




export const postLoginUser = async (userData) =>{
    const response = await axios.post(`${VITE_SERVER_URL}login`, userData)

    return response.data
}