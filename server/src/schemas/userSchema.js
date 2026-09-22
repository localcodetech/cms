// src/schemas/userSchema.js

import z from "zod";

// z => zod



export const registerSchema = z.object({
    firstname: z.string().trim().toLowerCase().min(3),
    lastname: z.string().trim().toLowerCase().min(3),
    username: z.string().trim().toLowerCase().min(3),
    email : z.email().trim().toLowerCase(),
    password: z.string().trim().min(6)
});




export  const loginSchema = z.object({
     email : z.email().trim().toLowerCase(),
    password: z.string().trim().min(6)
});
