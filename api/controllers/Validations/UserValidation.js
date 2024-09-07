import Joi from "joi";

export const registerUserValidation = Joi.object({
  permalink: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.number().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

export const findUserByUserIdValidation = Joi.object({
  userid: Joi.number().required(),
});

export const deleteUserByUserIdValidation = Joi.object({
  userid: Joi.number().required(),
});

export const updateIDUserByUserIdValidation = Joi.object({
  userid: Joi.number().required(),
});

export const updateUserByUserIdValidation = Joi.object({
  permalink: Joi.string(),
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.number(),
});
