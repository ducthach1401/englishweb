import Joi from "joi";

export const createUserSchema = Joi.object({
    name: Joi.string().required().max(20),
    username: Joi.string().required().max(20),
    password: Joi.string().required().min(8),
    passwordConfirm: Joi.string().required().equal(Joi.ref('password'))
});

export const updateNameSchema = Joi.object({
    name: Joi.string().required().max(20)
});

export const passwordSchema = Joi.object({
    password: Joi.string().required().min(8),
    passwordConfirm: Joi.string().required().equal(Joi.ref('password'))
});