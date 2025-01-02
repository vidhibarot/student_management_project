const { STATUS_CODES, STATUS_MESSAGES } = require('../Config/constant');

const userModel = new (require('../Models/users'))();

class userController {

    // sign in
    async signIn(req, res) {
        try {
            let data = await userModel.signIn(req?.body);

            if (data.status === STATUS_CODES.NOT_VALID_DATA) {
                res.handler.validationError(undefined, data.message);
                return;
            }

            if (data.status === STATUS_CODES.NOT_FOUND) {
                res.handler.notFound(undefined, data.message);
                return;
            }

            res.handler.success(data, STATUS_MESSAGES.LOGIN_SUCCESS);
        } catch (error) {
            res.handler.serverError(error)
        }
    }

}

module.exports = userController;