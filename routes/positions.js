var express = require('express');
var router = express.Router();
const PositionService = require("../services/position-service.js");
const path = require("path");

//上传文件中间件配置
const multer = require("multer");
//磁盘存储配置
const storage = multer.diskStorage({
    //上传目标目录
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, "../public/images/upload/")); //服务器上的绝对路径
    },
    //上传文件名称
    filename: function(req, file, cb) {
        const text = file.originalname.split(".").pop(); //lastIndexOf(".")//slice(21)
        cb(null, file.fieldname + '-' + Date.now() + "." + text); //new +date.gettime()
    }
})

const upload = multer({ storage: storage })


//添加职位
router.post("/add.do", upload.single('logo'), PositionService.add);

//修改职位
//router.post("/update.do", upload.single('logo').PositionService.update);

module.exports = router;