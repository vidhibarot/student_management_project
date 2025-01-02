const router = (require('express')).Router()

const Authentication = new (require("../Middleware/authentication"))
const userAuth = Authentication.userAuth;
const studentController = new (require('../Controllers/students'))
const { IMG_FOLDER_NAME } = require("../config/constant");
const FileManager = new (require("../Utils/file_manager"))

// add students
router.route('/add').post(userAuth,FileManager.userUploadImage(IMG_FOLDER_NAME.STUDENTS).single('file'), studentController.addStudent);

// get student by id
router.route('/:id').get(userAuth,studentController.getstudentById);

// Get student List
router.route('/list').post(userAuth,studentController.getstudentsList);

// Get department list
router.route('/department/list').get(studentController.getDepartmentList);

// Delete student by id
router.route('/delete/:id').get(userAuth,studentController.deleteStudent);

module.exports = router