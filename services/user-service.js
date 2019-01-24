/* 用户相关业务逻辑处理 */

const UserDao = require("../dao/user-dao.js");
var bcrypt = require('bcrypt-nodejs');

const UserService = {
    //登录业务逻辑处理
    login: function(req, res, next) {
        //从请求中获取登录的用户名与密码
        const { username, password } = req.body; //POST请求中传递的数据
        //const { username, password } = req.query; //GET请求中转递的数据
        //console.log(username, password);
        //res.send("用户名:" + username + ",密码:" + password);

        //从数据库中查询用户信息，然后对比用户名、密码
        UserDao.find({ username }).then(function(data) { //解构赋值
            //data查询返回的一个集合(数组)数据,包含了所有满足条件的结果集
            if (data.length === 1) { //数据库中恰好有一个满足条件的用户
                //比较密码
                //if (data[0].password === password) { //密码相同,能够登录成功
                if (bcrypt.compareSync(password, data[0].password)) {
                    //将登录成功的用户信息保存到session中
                    req.session.loginUser = username;
                    res.json({
                        res_code: 1,
                        res_error: "",
                        res_body: {
                            status: 1,
                            message: "登录成功",
                            data: {
                                username
                            }
                        }
                    });
                } else { //密码不同
                    res.json({
                        res_code: 1,
                        res_error: "",
                        res_body: {
                            status: 0,
                            message: "密码错误",
                            data: {}
                        }
                    });
                }
            } else {
                res.json({
                    res_code: 1,
                    res_error: "",
                    res_body: {
                        status: 0,
                        message: "用户名错误",
                        data: {}
                    }
                });
            }
        });
    },
    //注册业务逻辑处理
    register(req, res, next) {
        const { username, password, email } = req.body;
        //注册
        UserDao.find({ username }).then((data) => {
            if (data.length > 0) {
                res.json({
                    res_code: 1,
                    res_error: "",
                    res_body: {
                        status: 0,
                        message: "用户名已被注册",
                        data: {}
                    }
                });
            } else {
                //密码加密处理
                var hash = bcrypt.hashSync(password);
                UserDao.save({ username, password: hash, email }).then((data) => {
                    //将注册成功的用户信息保存到session中
                    req.session.loginUser = username;
                    res.json({
                        res_code: 1,
                        res_error: "",
                        res_body: {
                            status: 1,
                            message: "用户注册成功",
                            data: {
                                username
                            }
                        }
                    });
                });
            }
        });
    },
    logout(req, res, next) {
        //将退出的用户信息删除
        req.session.loginUser = null;
        res.json({
            res_code: 1,
            res_error: "",
            res_body: {
                status: 1,
                message: "用户注销成功",
                data: {}
            }
        });
    }
};

module.exports = UserService;