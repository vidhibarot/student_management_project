const userModel = new (require('../Models/users'))();

class Authentication {
    constructor() {
        this.userAuth = this.userAuth.bind(this);
    }

    // user auth
    async userAuth(req, res, next) {
        let authToken = req.headers.authorization;
        if (!authToken) {
            res.handler.validationError(undefined, STATUS_MESSAGES.TOKEN.INVALID);
            return false
        }

        const userToken = await userModel.getuserTokenInfo(authToken);

        if (!userToken) {
            res.handler.unauthorized();
            return;
        }

        req.userInfo = userToken ? userToken.user ? userToken.user['dataValues'] : null : null;
        next();
    }
}
module.exports = Authentication;