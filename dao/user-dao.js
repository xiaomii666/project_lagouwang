// 用户相关数据访问
const { User } = require("./model.js");

const UserDao = {
    /**
     * @param {object} username 待保存的用户对象信息
     */
    //保存用户信息
    save(Userinfo) { /* 文档注释 */
        return new User(Userinfo).save();
    },
    /**
     * 
     * @param {object} Userinfo 修改后用户对象信息
     */
    //修改用户信息
    update(Userinfo) {
        const condition = { _id: Userinfo._id }; //条件
        return User.update(condition, Userinfo);
    },
    /**
     * 
     * @param {object} condition 查询条件判断
     */
    //查询用户信息
    find(condition) {
        return User.find(condition);
    },
    /**
     * 
     * @param {object} condition 删除
     */
    //删除用户信息
    delete(condition) {
        return User.remove(condition);
    }
};

module.exports = UserDao;