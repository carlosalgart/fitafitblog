import  * as Joi from '@hapi/joi';
export const pathParams = Joi.object({
    postId: Joi.number().required()
})
export const payload = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    postId: Joi.number().required()
})
export const update = {
    params: pathParams,
    payload
};