const Joi = require("joi");

// Schema to validate new task creation input
const taskSchema = Joi.object({
    title: Joi.string().min(1).required(),                       // Task title is required, min length 1
    status: Joi.string().valid("pending", "completed").default("pending"),  // Status with default "pending"
});

// Schema to validate task updates (partial allowed)
const updateTaskSchema = Joi.object({
    title: Joi.string().min(1),                                   // Optional updated title, min length 1
    status: Joi.string().valid("pending", "completed"),          // Optional updated status
});

module.exports = { taskSchema, updateTaskSchema };
