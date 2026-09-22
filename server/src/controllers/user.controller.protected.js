// src/controllers/user.controller.protected.js


import { userProtectedService } from "../services/user.protected.service.js";

import { userAuthMiddleware } from "../middleware/userAuthMiddleware.js";



export const UserProtectedController = async(req, res) => {
      const  id = req.user.id
    try{
        const user = await userProtectedService(id)
        res.status(200).json({
            message: "user Profile", 
            user : user
        })

    }catch(error){
        res.status(401).json({error: error.message})
    }

}