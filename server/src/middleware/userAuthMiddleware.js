import { isTokenblackListed} from "../utils/tokenBlacklist.js";
import { verifyToken } from "../utils/token.js";


export const getAuthHeaders = (req)=>{

        const authHeader = req.headers["authorization"];

        const token = authHeader && authHeader.startsWith("Bearer") && authHeader.split(" ")[1]
    
        return token

}



export const userAuthMiddleware = async(req, res, next) =>{

    const token = getAuthHeaders(req)

 if (!token) {
        return res.status(401).json({message:"unauthorized"})
    }

    const isBlackListed = await isTokenblackListed(token)

    if (isBlackListed) return res.status(401).json({message: "unauthorized"})

        try{
            const decoded = verifyToken(token)
            req.user = decoded 
            next()
        }
        catch (error) {
            res.status(401).json({message: error.message})
        }

}