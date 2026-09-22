
import axios from "axios"
const {VITE_SERVER_URL} = import.meta.env

console.log(VITE_SERVER_URL)

// export const postRegisterData = async (firstname, lastname, username, email, password) =>{

//     const response = await fetch(`${SERVER_URL}/register`, {
//         method: "POST", 
//         headers : {
//             "content-type" : "application/json"
//         },
//         body : JSON.stringify({
//             firstname : firstname,
//             lastname: lastname,
//             username: username,
//             email: email,
//             password: password
//         })
//     })

//     if (!response.ok){
//         throw new Error(response.statusText)
//     }

//     const data = await response.json();
//     return data;
// }



export const postRegisterData = async (userData) =>{

    const res = await axios.post(`${VITE_SERVER_URL}register`, userData)
    return  res.data;
}




export const postLoginUser = async (userData) =>{
    const response = await axios.post(`${VITE_SERVER_URL}login`, userData)

    return response.data
}