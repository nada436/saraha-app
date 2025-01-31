import { Router } from "express";
import { error_handel } from "../../utils/error handeling.js";
import { recive_messages, send_message } from "./message.serves.js";
import { validation } from "../../mideleware/validation.js";
import { message_schema } from "./message.validation.js";
import { authorization } from "../../mideleware/authorization.js";
import { authantcation } from "../../mideleware/authantication.js";
export const message_router=Router()
message_router.post('/send',error_handel(validation(message_schema)),error_handel(send_message))
message_router.get('/mymessages',error_handel(authantcation),error_handel(recive_messages))