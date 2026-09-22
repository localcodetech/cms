// src/routes/userRoute.js

import { Router } from "express";

import { registerSchema, loginSchema } from "../schemas/userSchema.js";
import { userRegisterController, userLoginController, userLogoutController } from "../controllers/userController.js";

import { schemaValidation } from "../middleware/validation.js";
import { userAuthMiddleware } from "../middleware/userAuthMiddleware.js";
import { UserProtectedController } from "../controllers/user.controller.protected.js";



const router = Router();

router.get("/", (_,res)=> res.status(200).json({meesage: "success"}))

router.post("/register", schemaValidation(registerSchema), userRegisterController);
router.post("/login", schemaValidation(loginSchema), userLoginController)

router.post("/logout",userAuthMiddleware, userLogoutController )

router.get("/me", userAuthMiddleware,UserProtectedController )

export default router;