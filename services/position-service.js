const PositionDao = require("../dao/position-dao.js");

const PositionService = {
    //添加职位的业务逻辑处理
    add(req, res, next) {
        //获取请求中传递的职位信息
        const { position, company, address, salary } = req.body;
        let logo = "";
        if (req.file) logo = "/images.upload/" + req.file.filename;
        //保存到数据库中
        PositionDao.save({ logo, position, company, address, salary })
            .then((data) => {
                res.json({
                    res_code: 1,
                    res_error: "",
                    res_body: {
                        status: 0,
                        message: "添加成功",
                        data: data
                    }
                });
            });
    }
}

module.exports = PositionService;