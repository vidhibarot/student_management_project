const {
    fees: feesSchema,
} = require("../Database/Schema");
require("dotenv").config();
const Razorpay = require('razorpay')
require('dotenv').config();
const crypto = require("crypto");


class feesModel {

    //for pay fees
    async payFees(userInfo, bodyData) {
        console.log("vvvvvvvvvvvvv",)
        const { amount, studentName, email, contact } = bodyData;
        try {
            const razorpay = new Razorpay({
                key_id: process.env.RAZORPAY_ID_KEY,
                key_secret: process.env.RAZORPAY_SECRET_KEY,
            });

            const order = await razorpay.orders.create({
                amount: amount * 100, // Amount in paise
                currency: "INR",
                receipt: `receipt_${Date.now()}`,
            });
            // console.log("amounttttttt>>>", amount)
            if (!order) {
                return ({ success: false, message: "Error creating Razorpay order" })
            }

            await feesSchema.create({ "student_id": userInfo?.students[0]?.dataValues?.id, "amount": amount, "date": Date.now() })
            return ({ success: true, order });
        } catch (err) {
            console.error(err);
            return ({ success: false, message: "Error creating Razorpay order" })
        }
    }

    //for confirm payment
    async payment(userInfo, body) {
        console.log("gggggggggggg2222", userInfo, body)

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

        const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET_KEY);
        hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const digest = hmac.digest("hex");

        if (digest !== razorpay_signature) {
            return ({ success: false, message: "Invalid transaction" });
        }

        return ({ success: true, message: "Payment validated successfully" });
    }

}

module.exports = feesModel;
