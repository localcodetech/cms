// src/services/user.protected.service.js




import { findUserByID } from "../repositories/userRepositories.js";
import { sanitizeDataForUser } from "./userServices.js";

export const userProtectedService = async (id) =>{

    const user = await findUserByID(id) 

    return sanitizeDataForUser(user);
}