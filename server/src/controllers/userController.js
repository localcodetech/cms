
// src/controllers/userController.js
import { loginUseFromDB, registerNewUserIntoDB } from "../services/userServices.js";
import { getAuthHeaders } from "../middleware/userAuthMiddleware.js";
import { blackListToken } from "../utils/tokenBlacklist.js";


export const userRegisterController =  async(req, res) =>{
    const {firstname, lastname, username, email, password} = req.body

    try{
    
        const newUser = await registerNewUserIntoDB(firstname,lastname,username,email, password)
        res.status(201).json({message: "UserData Created successfully", data: newUser})

    }
    catch(err){
        res.status(500).json({error: err.message})

    }


}




export const  userLoginController = async(req, res) => {
    const {email, password} = req.body;

    try{

        const user = await loginUseFromDB(email, password)
        return res.status(200).json({message: "login successfully", data: user})
    }
    catch(error){
        if (error.message === "invalid credentials") return res.status(401).json({error: "Invalid user credentials"});

        return res.status(500).json({error: error.message})
    }
};






// logic 

export const userLogoutController = async (req, res) =>{
    console.log(req.user)
    const exp = req.user.exp
try{
    const token = getAuthHeaders(req)
     await blackListToken(token, exp)

    res.status(200).json({message: "Logged out successfully", 

    })
}
catch(error){
    res.status(500).json({error: error.message})
}

}