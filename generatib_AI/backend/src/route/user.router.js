import express from 'express'
import { loginvalidator, registerValidator } from '../validator/auth.validator.js'
import { allUserController, authLoginController,authLogoutController, authMeController, authRefreshController, authRegisterController } from '../controlers/user.controller.js'
import { authenticate } from '../middleware/user.middleware.js'

const router = express.Router()


router.post("/register",registerValidator,authRegisterController)
router.post("/login",authenticate,loginvalidator,authLoginController)
router.post("/refresh",authenticate,authRefreshController)
router.get("/me",authenticate,authMeController)
router.post("/logout",authenticate,authLogoutController)
router.get("/findalluser",allUserController)

export default router