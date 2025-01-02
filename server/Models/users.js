const {
    users: usersSchema,
    roles: rolesSchema,
    user_tokens: usersTokenSchema,
    students: studentsSchema,
    marks: marksSchema,
    fees: feesSChema,
} = require("../Database/Schema");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { STATUS_CODES, STATUS_MESSAGES, } = require("../config/constant");

class userModel {

    // for auth
    async getuserTokenInfo(access_token) {
        return await usersTokenSchema.findOne({
            where: {
                access_token,
            },
            attributes: ["user_id", "createdAt", "updatedAt"],
            include: [
                {
                    model: usersSchema,
                    attributes: { exclude: ["createdAt", "updatedAt", "password"] },
                    include: [
                        {
                            model: rolesSchema,
                            attributes: { exclude: ["createdAt", "updatedAt"] },
                        },
                        {
                            model: studentsSchema,
                            attributes: { exclude: ["createdAt", "updatedAt"] },
                        },


                    ]
                },
            ],
        });
    }

    // sign in
    async signIn(bodyData) {

        let check_user = await usersSchema.findOne({
            where: {
                username: bodyData?.username,
            },
        });

        if (!check_user) {
            return {
                status: STATUS_CODES.NOT_FOUND,
                message: STATUS_MESSAGES.NOT_FOUND.USER,
            };
        }

        let match_password = await bcrypt.compare(
            bodyData?.password,
            check_user?.password
        );

        if (!match_password) {
            return {
                status: STATUS_CODES.NOT_VALID_DATA,
                message: STATUS_MESSAGES.PASSWORD.INCORRECT,
            };
        }
        let findToken = await usersTokenSchema.findOne({
            where: {
                user_id: check_user?.id,
            },
        })

        if (findToken) {
            await usersTokenSchema.destroy({
                where: {
                    user_id: check_user?.id,
                },
            })
        }

        let token = jwt.sign({ username: check_user?.username }, process.env.SECRET_KEY);
        
        await usersTokenSchema.create({
            access_token: token,
            user_id: check_user?.id,
        });


        let userData = await usersSchema.findOne({
            where: {
                id: check_user?.id
            },
            include: [
                {
                    model: rolesSchema,
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                },
                {
                    model: studentsSchema,
                    attributes: { exclude: ["createdAt", "updatedAt"] },

                    include: [
                        {
                            model: marksSchema,
                            attributes: { exclude: ["createdAt", "updatedAt"] },
                        },
                        {
                            model: feesSChema,
                            attributes: { exclude: ["createdAt", "updatedAt"] },
                        },
                    ]
                },


            ]
        })
        userData.dataValues.token = token;

        return userData;
    }
}

module.exports = userModel;
