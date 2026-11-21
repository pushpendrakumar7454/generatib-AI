import { body, validationResult } from "express-validator"

export const registerValidator = [

    body("email")
        .exists()
        .withMessage("Email field is required") .bail()
        .isEmail().withMessage("Please enter a valid email address").bail()
        .trim()
        .isString().withMessage("Email must be string"),

    body("username")
        .exists().withMessage("Username is required").bail().isString()
        .withMessage("Username must be a string").bail()
        .isLength({ min: 3, max: 20 }).withMessage("Username must be between 3 and 20 characters").bail()
        .matches(/^[a-zA-Z0-9_]+$/).withMessage("Username can contain only letters, numbers and underscore"),

    body("name")
        .exists().withMessage("Name is required").bail()
        .trim()
        .isString().withMessage("Name must be string").bail()
        .isLength({ min: 3, max: 50 }) .withMessage("Name must be between 3 and 50 characters"),

    body("number")
        .exists()
        .withMessage("Phone number is required")
        .bail()
        .trim()
        .isMobilePhone()
        .withMessage("Please enter a valid phone number")
        .bail()
        .isString()
        .withMessage("Phone number must be string"),

    body("password")
        .exists()
        .withMessage("Password is required")
        .bail()
        .trim()
        .isString()
        .withMessage("Password must be string")
        .bail()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),

    (req, res, next) => {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Invalid request",
                errors: errors.array()
            })
        }

        next()
    }
]


export const loginvalidator = [

    body("email")
        .exists()
        .withMessage("Email field is required")
        .bail()
        .isEmail()
        .withMessage("Please enter a valid email address")
        .bail()
        .trim()
        .isString()
        .withMessage("Email must be string"),

    body("password")
        .exists()
        .withMessage("Password is required")
        .bail()
        .trim()
        .isString()
        .withMessage("Password must be string")
        .bail()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),

    (req, res, next) => {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Invalid request",
                errors: errors.array()
            })
        }

        next()
    }
]

