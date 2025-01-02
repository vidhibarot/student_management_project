const { STATUS_CODES, STATUS_MESSAGES, ROLE_TYPES_ID } = require('../config/constant');
const feesModel = new (require("../Models/fees"))

class feesController {

    //Pay fees
    async payFees(req, res) {
        try {
            let data = await feesModel.payFees(req?.userInfo, req?.body);
            res.handler.success(data)
        } catch (error) {
            res.handler.serverError(error);
        }
    }

    //confirm Fees
    async payment(req, res) {
        try {
            let data = await feesModel.payment(req?.userInfo, req?.body);
            res.handler.success(data)
        } catch (error) {
            res.handler.serverError(error);
        }
    }

}

module.exports = feesController;