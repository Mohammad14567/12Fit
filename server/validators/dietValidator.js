const Joi = require("joi");
// Validate incoming diet request data before processing it
// to ensure required fields are present and correctly formatted.
exports.generateDietSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),

  age: Joi.number().min(10).max(100).required(),

  weight: Joi.number().min(20).max(300).required(),

  height: Joi.number().min(100).max(250).required(),

  gender: Joi.string()
    .valid("male", "female")
    .required(),

  fitnessLevel: Joi.string()
    .valid("beginner", "intermediate", "advanced")
    .required(),

  activityLevel: Joi.string()
    .valid(
      "sedentary",
      "light",
      "moderate",
      "active",
      "very_active"
    )
    .required(),

  goal: Joi.string()
    .valid(
      "lose weight",
      "muscle gain",
      "weight gain",
      "general fitness"
    )
    .required(),

  injuries: Joi.string().allow("").optional(),

  medicalConditions: Joi.string().allow("").optional(),

  dietaryRestrictions: Joi.string().allow("").optional(),

  preferredFoods: Joi.string().allow("").optional(),

  dislikedFoods: Joi.string().allow("").optional(),
});