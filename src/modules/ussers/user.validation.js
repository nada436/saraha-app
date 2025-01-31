
import Joi from 'joi';

const customPhoneValidator = (value, helpers) => {
  if (value.length !== 12) {
    return helpers.error('string.length', { value });
  }
  return value; // Return the validated value
};

export const signup_schema = {
  body: Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required(),
    cpassword: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required()
      .valid(Joi.ref('password'))
      .messages({ 'any.only': 'Passwords must match' }),
    inputephone: Joi.string()
      .custom(customPhoneValidator, 'Custom phone validation')
      .messages({ 'string.length': 'phone must contain 12 digits' }).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'gemail'] } })
      .required(),
  })
    .with('password', 'cpassword') 
    .unknown(true),
};


export const login_schema = {
  body:
  Joi.object({
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'gemail'] } })
  }).presence('required').with('email','password').unknown(true),
 
  }


  export const update_schema = {
    body:
    Joi.object({
      name: Joi.string().alphanum().min(3).max(30),
      inputephone: Joi.string()
      .custom(customPhoneValidator, 'Custom phone validation')
      .messages({ 'string.length': 'phone must contain 12 digits' }),
   
    }).presence('required').with('email','password').unknown(true),
    headers:Joi.object({auth:Joi.string().messages({ 'string.length': 'must enter token' }).required(),'content-type': Joi.string(),

  'accept': Joi.string(),

  'accept-encoding': Joi.string()
    ,

  'connection': Joi.string(),

  'user-agent': Joi.string(),

  'host': Joi.string(),
}).unknown(true)}
    
  
  
  
export const reassign_password_schema = {
  body:
  Joi.object({
    oldpassword: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),
    password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),
   cpassword: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required()
    .valid(Joi.ref('password'))
    .messages({ 'any.only': 'Passwords must match' }),
  }).presence('required').with('password', 'cpassword').unknown(true),
  headers:Joi.object({auth:Joi.string().messages({ 'string.length': 'must enter token' }).required(),'content-type': Joi.string(),

'accept': Joi.string(),

'accept-encoding': Joi.string()
  ,

'connection': Joi.string(),

'user-agent': Joi.string(),

'host': Joi.string(),
}).unknown(true)}
  



