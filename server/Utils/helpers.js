const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");


// Generate Otp for forgot password
async function generateOtp() {
    return otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
    });
}

// To create Hash Password
async function createHashPassword(password) {
    return await bcrypt.hash(password, 10);
}

module.exports = {
    generateOtp,
    createHashPassword,
};
