// 用户相关数据访问
const { Position } = require("./model.js");

const PositionDao = {
    /**
     * @param {object} username 待保存的用户对象信息
     */
    //保存用户信息
    save(positioninfo) { /* 文档注释 */
        return new Position(positioninfo).save();
    },
    /**
     * 
     * @param {object} positioninfo 修改后用户对象信息
     */
    //修改用户信息
    update(positioninfo) {
        const condition = { _id: positioninfo._id }; //条件
        return Position.update(condition, positioninfo);
    },
    /**
     * 
     * @param {object} condition 查询条件判断
     */
    //查询用户信息
    find(condition) {
        return Position.find(condition);
    },
    /**
     * 
     * @param {object} condition 删除
     */
    //删除用户信息
    delete(condition) {
        return Position.remove(condition);
    }
};

module.exports = PositionDao;