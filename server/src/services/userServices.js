import { hashpassword, compareHashedPassword } from "../utils/passwordUtils.js";

import { findAllUSers,
     findByUserEmail,
    createUser,
deleteUSerAccount,
findByUserName,findUserByID, updateUSerInfo
 } from "../repositories/userRepositories.js";
import { generateToken } from "../utils/token.js";


 export const sanitizeDataForUser = (user) =>{
   
    return {
        id : user.id,
        uuid: user.uuid,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
         email:user.email,
        createdAt: user.createdAt
    };

 };

export const registerNewUserIntoDB = async ( firstname, lastname, username,email, password) =>{

    const isEmailExist = await findByUserEmail(email)

    const isUsernameExist = await findByUserName(username)

    if (isEmailExist) {
        throw new Error("Email already Exist... use different email");
    }

    if (isUsernameExist){
        throw new Error("Username already exist ... use different name")
    };

    const hashedpassword = await hashpassword(password)

    const newUserCreated = await createUser({firstname, lastname,username, email, password:hashedpassword})

    return sanitizeDataForUser(newUserCreated)
 };



//  login logic



export  const loginUseFromDB =async (email, password) =>{

    const user = await findByUserEmail(email);

    if (!user){
        throw new Error("invalid credentials")
    };

    const compare = await compareHashedPassword(password, user.password);

    if (!compare) {
        throw new Error("invalid credentials")
    }

    const payload = {
        id : user.id,
        uuid : user.uuid,
        username: user.username,
    }

        const token = generateToken(payload)

      return {
        user: sanitizeDataForUser(user),
        token: token
      }
        

}