import jwt from "jsonwebtoken";
import { config } from "dotenv";
config()


const {JWT_SECRET} = process.env




export  const generateToken  =  (payload) =>{

    const token = jwt.sign(
    payload,
    JWT_SECRET,
    {expiresIn: "1d"}
);

return token;
};


export const  verifyToken  = (token) =>{
    return jwt.verify(token, JWT_SECRET)
}