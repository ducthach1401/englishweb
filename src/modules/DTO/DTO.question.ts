import Joi from "joi";

export const createQuestionSchema = Joi.object({
  english: Joi.string().required(),
  vietnamese: Joi.string().required(),
  type: Joi.string().required(),
  meaning: Joi.string(),
  exampleEnglish: Joi.string(),
  exampleVietnamese: Joi.string(),
  category: Joi.string(),
});

export const updateQuestionSchema = Joi.object({
  vietnamese: Joi.string(),
  type: Joi.string(),
  meaning: Joi.string(),
  exampleEnglish: Joi.string(),
  exampleVietnamese: Joi.string(),
  category: Joi.string(),
});

export const categorySchema = Joi.object({
  category: Joi.string().required(),
});

export const getQuestionsSchema = Joi.object({
  size: Joi.number(),
  page: Joi.number(),
  category: Joi.string(),
  type: Joi.string(),
});

export const englishSchema = Joi.object({
  english: Joi.string().required(),
});
