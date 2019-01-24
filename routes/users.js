var express = require('express');
var router = express.Router();
const UserService = require("../services/user-service.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

//登录：POST请求 /api/users/login.do
router.post('/login.do', UserService.login);

//注册：POST请求
router.post('/register.do', UserService.register);

//注销：GET请求
router.get('/logout.do', UserService.logout);

module.exports = router;