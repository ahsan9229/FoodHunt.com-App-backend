import express from "express";
import MyUserController from "../Controllers/MyUserController";
import { jwtCheck, jwtParse } from "../middleware/Auth";
import { validateMyUserRequest } from "../middleware/Validation";

const router = express.Router(); 

/// api/my/user
router.get('/' ,jwtCheck, jwtParse, MyUserController.getCurrentUser ) 
router.post('/', jwtCheck, MyUserController.createCurrentUser)
router.put('/' ,jwtCheck, jwtParse, validateMyUserRequest, MyUserController.updateCurrentUser)

export default router;