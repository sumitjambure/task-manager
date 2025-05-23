const Joi = require("joi");

// Schema to validate user registration input
const registerSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),   // Name required, 3-30 chars
    email: Joi.string().email().required(),         // Valid email required
    password: Joi.string().min(6).required(),       // Password min 6 chars required
});

// Schema to validate user login input
const loginSchema = Joi.object({
    email: Joi.string().email().required(),         // Valid email required
    password: Joi.string().min(6).required(),       // Password min 6 chars required
});

module.exports = { registerSchema, loginSchema };
