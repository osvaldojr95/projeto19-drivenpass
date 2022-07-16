import { stripHtml } from "string-strip-html";

export default function validSchema(schema) {
    return async (req, res, next) => {
        const schemaBody = {};
        for (const key in req.body) {
            if (typeof schemaBody[key] === "string") {
                schemaBody[key] = stripHtml(req.body[key]).result.trim();
            } else {
                schemaBody[key] = req.body[key];
            }
        }
        const validation = await schema.validate(schemaBody, {
            abortEarly: false,
        });
        if (validation.error) throw { type: "unprocessableEntity" };

        res.locals.body = validation.value;
        next();
    };
}