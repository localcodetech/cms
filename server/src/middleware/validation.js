// src/middleware/validation.js



export const schemaValidation = (schema) => (req, res, next) =>{

    const result = schema.safeParse(req.body);

    if (!result.success){
        return res.status(400).json({message: result.error.issues})
    }

    req.body = result.data;
    next()

};