define(["jquery"], function() {
    function RegisterModal() {
        this.createDom();
        this.regListeners();
    }
    RegisterModal.template = `<!-- Modal 注册 -->
    <div class="modal fade" id="register_myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">用户注册</h4>
                </div>
                <div class="modal-body">
                <div class="alert alert-danger hidden  login-error"></div>
                    <form class="form-register">
                        <div class="form-group">
                            <label for="reg_username">用户名</label>
                            <input type="text" class="form-control" name="username" id="reg_username" placeholder="请输入用户名">
                        </div>
                        <div class="form-group">
                            <label for="reg_password">密码</label>
                            <input type="password" class="form-control" name="password" id="reg_password" placeholder="输入密码">
                        </div>
                        <div class="form-group">
                            <label for="reg_password2">确认密码</label>
                            <input type="password" class="form-control" id="reg_password2" placeholder="再次输入密码">
                        </div>
                        <div class="form-group">
                            <label for="reg_Email">邮箱</label>
                            <input type="email" class="form-control" name="eamil" id="reg_Email" placeholder="输入E-mail地址">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary btn-register">注册</button>
                </div>
            </div>
        </div>
    </div>;`
    $.extend(RegisterModal.prototype, {
        //动态创建注册模态框
        createDom() {
            $("body").append(RegisterModal.template);
        },
        //创建注册监听事件
        regListeners() {
            $(".btn-register").on("click", this.regHandle);
        },
        //注册处理
        regHandle() {
            //url = "http://rap2api.taobao.org/app/mock/124733/api/users/login.do",
            const
                url = "/api/users/register.do",
                data = $(".form-register").serialize();
            $.post(url, data, (res) => {
                if (res.res_body.status === 0) {
                    $(".login-error").text(res.res_body.message).removeClass("hidden");
                } else {
                    location.href = "/";
                    $("#register_myModal").modal("hide");
                    location.reload();
                }
            }, "json");
        }
    });
    return RegisterModal;
});