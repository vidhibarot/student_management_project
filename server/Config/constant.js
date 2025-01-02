//GLOBAL STATUS
exports.STATUS_CODES = {
    // 1XX INFORMATIONAL
    CONTINUE: 100,
    SWITCHING_PROTOCOLS: 101,
    PROCESSING: 102,
    EARLY_HINTS: 103,

    // 2XX SUCCESS
    SUCCESS: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NON_AUTHORITATIVE_INFORMATION: 203,
    NO_CONTENT: 204,
    RESET_CONTENT: 205,
    PARTIAL_CONTENT: 206,
    MULTI_STATUS: 207,
    ALREADY_REPORTED: 208,
    ALREADY_REPORTED_User: 209,
    IM_USED: 226,

    // 4XX CLIENT ERROR
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    NOT_ALLOWED: 405,
    NOT_ACCEPTABLE: 406,
    CONFLICT: 409,
    PRECONDITION_FAILED: 412,
    VALIDATION_ERROR: 422,
    NOT_VALID_DATA: 422,

    // 5XX SERVER ERROR
    SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
};

//GLOBAL MESSAGES
exports.STATUS_MESSAGES = {
    SERVER_ERROR: "Internal server error! Please try again.",
    VERIFICATION_EMAIL_SENT: "We have sent you an verification email to your account",
    EMAIL_VERIFIED: "Your account has been verified successfully.",
    EMAIL_VERIFIED_ALREADY: "Your account is already verified.",
    REGISTER_SUCCESS: "You have successfully signed up.",
    LOGIN_SUCCESS: "You have successfully logged in.",
    IMAGE_SUCCESS: "Your image has been successfully saved.",
    IMAGE_REMOVED: 'Your image has been successfully removed.',
    RESET_PASSWORD_ALREADY: "You already have reset the password with this token.",

    EXISTS: {
        USER: "User already exist!",
        EMAIL: "Email is already registered!",
        EMAIL_GUEST: "It looks like you've ordered with us before! Click 'Forgot Password' to reset your password.",
        COUPON: "This coupon code already exist!",
        SLUG: "This slug already exist!",
        CONTACT: "Mobile number is already exist!",
        USERNAME: "Username is already exist!",
        TITLE: "This title already exist",
        EMAIL_ALREADY_EXISTS: "This email is already registered withe another customer!",
        DESIGNATION: 'Designation is already exist!',
        LEAVE_SUB_TYPES: 'This leave sub type is already exist!',
        ROLE: 'Role is already exist!',
        EXAM_TYPE: 'Exam type is already exist!',
        STANDARD: 'Standard is already exist!',
        USER_ENROLL: 'Alredy exam enrolled',
        USER_NOT_ALLOWED: 'You are not allowed to give this exam',
    },
    NOT_FOUND: {
        SKILL: "Skill is not available in our system!",
        USER: "User is not available in our system!",
        ROLE: "Role is not available in our system!",
        EMAIL: "Your email address is not available in our system!",
        ACCOUNT: "We can't find this account",
        USER_LOOKUP: "User is not available in our system!",
        SUBJECT: "Subject is not available in our system!",
    },
    PASSWORD: {
        MISMATCH: "Provided password do not match",
        TOO_SIMPLE: "Please create more complicated password",
        INCORRECT: "Password incorrect",
        NOT_SAME: "New Password and confirm password are not same",
        CHANGED: "Password has been changed successfully",
        CURRENT_PASSWORD_MISMATCH: "Current password does not match."
    },
    PROCESS: {
        EMAIL_SENT: "We have sent email to your account",
        EMAIL_SENT_ACCOUNT: "We have sent email to %s"
    },
    CONTACT_US_PROCESS: {
        EMAIL_SENT: "Your email has been sent successfully"
    },
    TOKEN: {
        INVALID: "Your token is not valid.",
        EXPIRED: "Your token has been expired.",
        LOGOUT: "You have been successfully logged out."
    },
    STUDENT: {
        ADD:'Student has been added successfully.',
        DELETED: 'Student has been deleted successfully.',
        NOT_AVAILABLE: 'Student not available in our system.',
    },
    USER: {
        ADDED: 'User has been added successfully.',
        NOT_VERIFIED: "Your email address is not verified.",
        INACTIVE: "Your email address is not active.",
        INVALID: "Please enter valid email & password."
    },
    REQUEST: {
        LIST: "Request has been loaded successfully.",
        DELETED: "Request has been deleted successfully.",
        NOT_FOUND: "Provided request doesn't exist."
    },

};

// File Path
exports.PATHS = {
    IMAGES: {
        USERS: "/Users",
        CUSTOMERS: "/Customers",
        PRODUCTS: "/Products"
    }
};

// Generic Status
exports.STATUS = {
    NOTDELETED: 0,
    INACTIVE: 0,
    ACTIVE: 1,
    COMPLETE: 1,
    PENDING: 0,
    CLOSE: 1,
    DELETED: 1,
    APPROVE: 3,
    REJECTED: 4,
    COMPLETED: 5,
    DEFAULT: 1,
    NOT_DEFAULT: 0,
    TRUE: true,
    FALSE: false
};


// Role type
exports.ROLE_TYPES = {
    TEACHERs: "Teachers",
    STUDENTS: "Students",
}

exports.ROLE_TYPES_ID = {
    TEACHER: 1,
    STUDENTS: 2,
}


// Deaprtment types
exports.DEAPRTMENT_TYPES = {
    MSC: "MSC IT",
    BSC: "BSC IT",
    BBA: "BBA",
    MBA: "MBA"
}

exports.DEPARTMENT_TYPES_ID = {
    MSC: 1,
    BSC: 2,
    BBA: 3,
    MBA: 4
}

// Role Permission
exports.ACCESS_TYPES = {
    READ: "read_access",
    WRITE: "write_access",
    DELETE: "delete_access",
};

//Image Paths
exports.IMG_FOLDER_NAME = {
    STUDENTS: '/students'
}
