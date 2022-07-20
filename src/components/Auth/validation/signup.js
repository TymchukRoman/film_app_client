const Joi = require('joi');

export const registerValidation = ({ username, email, password, repeatPassword }) => {

    const schema = Joi.object({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required()
            .label("Name"),

        password: Joi.string()
            .min(3)
            .max(15)
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required()
            .label('Password'),

        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required()
            .label("Email"),

        repeatPassword: Joi.any().equal(Joi.ref('password'))
            .required()
            .label('Password')
            .messages({ 'any.only': '{{#label}} does not match' })
    })


    return schema.validate({ username, email, password, repeatPassword });
}