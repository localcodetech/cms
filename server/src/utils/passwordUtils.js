import bcrypt from "bcryptjs";




export const hashpassword = async (password) =>{
    const SALT_ROUND = 10;

    return await bcrypt.hash(password, SALT_ROUND)
};



export const compareHashedPassword = async (password, hashedPassword)=>{

    return await bcrypt.compare(password, hashedPassword);
}