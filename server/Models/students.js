const mailer = new (require("../Utils/mailer"))();
const { where } = require("sequelize");
const {
    users: usersSchema,
    students: studentsSchema,
    marks: marksSchema,
    fees: feesSChema,
    departments: departmentSchema,
} = require("../Database/Schema");
require("dotenv").config();
const { createHashPassword } = require('../Utils/helpers');
const { STATUS, STATUS_CODES, IMG_FOLDER_NAME, ROLE_TYPES_ID } = require("../config/constant");
const FileManager = new (require("../Utils/file_manager"));

class studentModel {

    //add student 

    async addStudent(userInfo, bodyData, file) {
        let check_user = await usersSchema.findOne({
            where: { username: bodyData?.username }
        });

        if (check_user) {
            return {
                status: STATUS_CODES.ALREADY_REPORTED
            };
        }

        if (bodyData.password !== bodyData.confirm_password) {
            return {
                status: STATUS_CODES.NOT_VALID_DATA
            };
        }

        const lastStudent = await studentsSchema.findOne({
            where: {
                division: bodyData?.division,
                department_id: bodyData?.department_id
            },
            order: [["roll_no", "DESC"]]
        });

        const nextRollNo = lastStudent ? parseInt(lastStudent.roll_no) + 1 : 1;
        bodyData.roll_no = nextRollNo;

        const data = {
            username: bodyData?.username,
            email: bodyData?.email,
            password: bodyData?.password
        };

        await mailer.sendUserEmailAndPassword(data);

        bodyData.password = await createHashPassword(bodyData.password);

        const userData = await usersSchema.create({
            role_id: ROLE_TYPES_ID.STUDENTS,
            username: bodyData?.username,
            email: bodyData?.email,
            password: bodyData?.password
        });

        let url;
        if (file && typeof file === "object") {
            url = FileManager.createLiveImageURL(file, IMG_FOLDER_NAME.STUDENTS, 'single');
        }
        bodyData.image = url;
        bodyData.user_id = userData?.id;

        const studentData = await studentsSchema.create(bodyData);
        bodyData.marks = JSON.parse(bodyData?.marks)

        if (bodyData?.marks?.length > 0) {
            bodyData?.marks?.forEach(async (mark) => {
                await marksSchema.create({
                    student_id: studentData?.id,
                    subject: mark?.subject,
                    marks_obtained: mark?.marks_obtained,
                    total_marks: mark?.total_marks
                });
            });
        }

        return studentData;
    }

    // get student by id
    async getstudentById(userInfo, id) {
        const getData = await studentsSchema.findOne({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            where: {
                isDelete: STATUS.NOTDELETED,
                id: id
            },
            include: [
                {
                    model: marksSchema,
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                },
                {
                    model: feesSChema,
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                },
                {
                    model: departmentSchema,
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                },
            ]
        });
        if (!getData) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }
        return getData
    }

    //Get Get all students list
    async getstudentsList(userInfo, bodyData) {
        var currentPage;
        var itemsPerPage;
        var lastRecordIndex;
        var firstRecordIndex;
        if (bodyData?.currentPage && bodyData?.itemsPerPage) {
            currentPage = bodyData?.currentPage;
            itemsPerPage = bodyData?.itemsPerPage;
            lastRecordIndex = currentPage * itemsPerPage;
            firstRecordIndex = lastRecordIndex - itemsPerPage;
        }
        var sortBy = [];
        if (bodyData?.sortBy && bodyData?.sortBy?.length > 0) {
            bodyData?.sortBy?.map((sort) => {
                if (sort?.id !== "" && sort?.desc !== "") {
                    if (sort?.desc == true) {
                        sortBy?.push([sort?.id, "desc"]);
                    } else {
                        sortBy?.push([sort?.id, "asc"]);
                    }
                }
            });
        }
        if (sortBy?.length < 1) {
            sortBy = [['id', 'asc']];
        }
        var filterQuery = {};
        if (bodyData?.filters && bodyData?.filters?.length > 0) {
            bodyData?.filters?.forEach((filter) => {
                if (filter?.id != "" && filter?.value != "") {
                    if (typeof (filter?.value) === 'string') {
                        filterQuery[filter?.id] = {
                            [SEQUELIZE.Op.like]: `%${filter?.value.trim()}%`,
                        };
                    }
                    else {
                        filterQuery[filter?.id] = {
                            [SEQUELIZE.Op.eq]: `${filter?.value}`
                        };
                    }
                }
            });;
        }

        const count = await studentsSchema.count({
            where: {
                ...filterQuery
            }
        })

        const data = await studentsSchema.findAll({
            where: {
                ...filterQuery
            },
            include: [{
                model: marksSchema,
                attributes: { exclude: ["createdAt", "updatedAt"] },
            },
            {
                model: departmentSchema,
                attributes: { exclude: ["createdAt", "updatedAt"] },
            },
            {
                model: feesSChema,
                attributes: { exclude: ["createdAt", "updatedAt"] },
            }],
            offset: firstRecordIndex,
            limit: itemsPerPage,
            order: [...sortBy],

        });

        return {
            rows: count,
            data: data
        }
    }

    //Delete student
    async deleteStudent(userInfo, id) {

        const studentFound = await studentsSchema.findOne({
            where: {
                id: id,
                isDelete: STATUS.NOTDELETED
            }
        });

        if (!studentFound) {
            return { status: STATUS_CODES.NOT_FOUND }
        };
        
        await usersSchema.update({ isDelete: STATUS.DELETED }, {
            where: {
                id: studentFound?.user_id
            }
        })

         await studentsSchema.update({ updated_by: userInfo?.id, isDelete: STATUS.DELETED }, {
            where: {
                id: id
            }
        });

       

        return { status: STATUS_CODES.ACCEPTED };
    };


    //Get all department list
    async getDepartmentList() {
        return await departmentSchema.findAll()
    }

}

module.exports = studentModel;
