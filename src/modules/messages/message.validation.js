import Joi from "joi"
export const message_schema = {
  body:
  Joi.object({
    content: Joi.string().required(),
  }),
 
  }