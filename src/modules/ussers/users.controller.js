import { Router } from "express";
import { confirm, freeze_account, getprofile, login, re_assign_password, share_account, signup, update_profile } from "./users.servece.js";  

import { validation } from "../../mideleware/validation.js";
import { login_schema, reassign_password_schema, signup_schema, update_schema } from "./user.validation.js";
import { error_handel } from "../../utils/error handeling.js";
import { authantcation } from "../../mideleware/authantication.js";
import { authorization } from "../../mideleware/authorization.js";
export const user_route = Router();


user_route.post('/signup',error_handel(validation(signup_schema)) ,error_handel(signup));
user_route.get('/login',error_handel(validation(login_schema)), error_handel(login));
user_route.get('/getprofile',error_handel(authantcation),error_handel(getprofile));
user_route.get('/confirm/:token', error_handel(confirm));
user_route.patch('/updateprofile',error_handel(validation(update_schema)),error_handel(authantcation),error_handel(update_profile));
user_route.patch('/updatepassword',error_handel(validation(reassign_password_schema)),error_handel(authantcation),error_handel(re_assign_password));
user_route.delete('/softdelete',error_handel(authantcation),error_handel(freeze_account));
user_route.get('/share/:id',error_handel(share_account));
