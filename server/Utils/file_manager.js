const multer = require('multer')
const path = require('path');
const fs = require('fs');

class FileManager {

    getFileName(file) {
        return file.originalname.split('.')[0].replace(/[^A-Z0-9]/ig, "_") + '_' + Date.now() + '_' + Math.floor(Math.random() * 999) + 99 + path.extname(file.originalname)
    }

    resolvePath(filepath) {
        let utilPath = (__dirname).split("\\");
        utilPath.pop(utilPath?.length - 1);
        let PathJoin = utilPath.join("/") + "/Assets/images" + filepath;
        let pathToCreateFolder = PathJoin.split("/");
        let folderToCreate = utilPath.join("\\");
        for (let i = utilPath?.length; i <= pathToCreateFolder?.length - 1; i++) {
            folderToCreate = folderToCreate.concat("\\" + pathToCreateFolder[i])
            if (!fs.existsSync(folderToCreate)) {
                fs.mkdirSync(folderToCreate);
            }
        }
        return path.join(__dirname, "../Assets/Images/" + filepath + "/")
    }

    userUploadImage(folderName) {
        var storage = multer.diskStorage({
            destination: function (req, file, callBack) {
                if (folderName) {
                    callBack(null, this.resolvePath(folderName))
                } else {
                    callBack(null, this.resolvePath(req?.body?.folderName))
                }
            }.bind(this),
            filename: function (req, file, callBack) {
                let fileName = this.getFileName(file);
                if (!req.body[file.fieldname]) {
                    req.body[file.fieldname] = []
                    req.body[file.fieldname].push(fileName)
                } else
                    req.body[file.fieldname].push(fileName)
                callBack(null, fileName)
            }.bind(this),
        })

        return multer({ storage })
    }

    // Create Live Image URL 
    createLiveImageURL(filedata, folderName, imageCount) {
        if (imageCount == 'single') {
            return process.env.FRONTEND_IMAGE_PATH + folderName + "/" + filedata[0]
        }
        else {
            return process.env.FRONTEND_IMAGE_PATH + folderName + "/" + filedata?.filename
        }
    }
}
module.exports = FileManager;