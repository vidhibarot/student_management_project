const { STATUS_CODES, STATUS_MESSAGES } = require('../config/constant');

const studentModel = new (require('../Models/students'))();

class studentController {

    // Add students
    async addStudent(req, res) {
        try {
            let data = await studentModel.addStudent(req?.userInfo, req?.body, req?.body?.file);

            if (data.status === STATUS_CODES.ALREADY_REPORTED) {
                res.handler.conflict(undefined, STATUS_MESSAGES.EXISTS.USER);
                return;
            }

            if (data.status === STATUS_CODES.NOT_VALID_DATA) {
                res.handler.validationError(undefined, STATUS_MESSAGES.PASSWORD.NOT_SAME);
                return;
            }

            res.handler.success(undefined, STATUS_MESSAGES.STUDENT.ADD);

        } catch (error) {
            res.handler.serverError(error)
        }
    }

    // Delete student
    async deleteStudent(req, res) {
        try {
            const data = await studentModel.deleteStudent(req?.userInfo, req?.params?.id);

            if (data?.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, data?.message);
            };

            return res.handler.success(data, STATUS_MESSAGES.STUDENT.DELETED);

        } catch (error) {
            res.handler.serverError(error);
        };
    };


    // get student by id
    async getstudentById(req, res) {
        try {
            let data = await studentModel.getstudentById(req?.userInfo, req?.params?.id);
            if (data.status === STATUS_CODES.NOT_FOUND) {
                res.handler.validationError(undefined, STATUS_MESSAGES.STUDENT.NOT_AVAILABLE);
                return;
            }
            res.handler.success(data);
        } catch (error) {
            res.handler.serverError(error)
        }
    }

    // Get all students list
    async getstudentsList(req, res) {
        try {
            let data = await studentModel.getstudentsList(req?.userInfo, req?.body);
            if (data.status == STATUS_CODES.NOT_VALID_DATA) {
                res.handler.validationError(undefined, STATUS_MESSAGES.NOTIFICATIONS.NOT_FOUND);
                return;
            }
            res.handler.success(data);
        } catch (error) {
            res.handler.serverError(error)
        }
    }

    //Get all department list
    async getDepartmentList(req, res) {
        try {
            let data = await studentModel.getDepartmentList();
            res.handler.success(data);
        } catch (error) {
            res.handler.serverError(error)
        }
    }
}

module.exports = studentController;