import Joi from "joi";

export const gamesSchema = Joi.object({
  name: Joi.string().required(),
  image: Joi.string().uri().required(),
  stockTotal: Joi.number().integer().min(1).required(),
  categoryId: Joi.number().integer().min(1).required(),
  pricePerDay: Joi.number().integer().min(1).required(),
});
