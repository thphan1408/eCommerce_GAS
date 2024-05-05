'use strict'

import express from 'express'
import AccessController from '../../controllers/access.controller.js'
import asyncHandler from '../../helpers/asyncHandler.js'
import { authentication } from '../../auth/authUtils.js'

const router = express.Router()

// SignUp
router.post('/shop/signup', asyncHandler(AccessController.signUp))

// SignIn
router.post('/shop/login', asyncHandler(AccessController.logIn))

// middleware Authentication for logOut
router.use(authentication)
//

// LogOut
router.post('/shop/logout', asyncHandler(AccessController.logOut))
router.post(
  '/shop/handlerRefreshToken',
  asyncHandler(AccessController.handlerRefreshToken),
)

export default router
