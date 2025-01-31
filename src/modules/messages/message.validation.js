import Joi from "joi"
export const message_schema = {
  body:
  Joi.object({
    content: Joi.string().required(),
    user_id: Joi.string().required(),
  }).presence('required').with('content','user_id').unknown(true),
 
  }