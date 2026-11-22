
import { body,validationResult } from "express-validator";

export const createMessageValidator = [
    body("title")
        .notEmpty()
        .withMessage("Title is required")
        .isString()
        .withMessage("Title must be a string")
        .trim(),

    body("lastMessage")
        .optional()
        .isString()
        .withMessage("Last message must be a string")
        .trim(),

        (req,res,next)=>{
            const errors=validationResult(req)
            if(!errors.isEmpty()){{
                return res.status(403).json({
                    message:"invalid request",
                    errors:errors.array()
                })
            }}
            next()
        }
];
