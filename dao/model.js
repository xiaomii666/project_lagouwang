const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/h5-1809', { useMongoClient: true }); //连接数据库

//用户数据结构
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
});
//职位
const positionSchema = new mongoose.Schema({
    logo: String,
    position: String,
    company: String,
    address: String,
    salary: Number
});

//用户model
const User = mongoose.model("user", userSchema); //实际生成一个user的集合(表)
const Position = mongoose.model("position", positionSchema);

//定义模块
module.exports = { User, Position };