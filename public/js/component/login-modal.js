define(["jquery"], function() {
    function LoginModal() {
        this.createDOM();
        this.logListeners();
    }
    LoginModal.template = `<!-- Modal 登录-->
    <div class="modal fade" id="login_myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">用户登录</h4>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger hidden  login-error">用户名或密码错误</div>
                    <form class="form-login">
                        <div class="form-group">
                            <label for="login_username">用户名</label>
                            <input type="text" class="form-control" id="login_username" name="username" placeholder="请输入用户名">
                        </div>
                        <div class="form-group">
                            <label for="login_password">密码</label>
                            <input type="password" class="form-control" id="login_password" name="password" placeholder="输入密码">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary btn-login">登录</button>
                </div>
            </div>
        </div>
    </div>`;
    $.extend(LoginModal.prototype, {
        //动态创建登录模态框
        createDOM() {
            $("body").append(LoginModal.template);
        },
        //创建登录监听事件
        logListeners() {
            $(".btn-login").on("click", this.logHandle);
        },
        //登录处理
        logHandle() {
            const
                url = "http://rap2api.taobao.org/app/mock/124733/api/users/login.do",
                data = $(".form-login").serialize();
            $.post(url, data, (res) => {
                if (res.res_body === 0) { //用户名或密码错误
                    console.log("失败");
                    $(".login-error").removeClass("hidden");
                } else { //登录成功
                    console.log("成功");
                    $("#login_myModal").modal("hide");
                }
            }, "json");
        }
    });
    return LoginModal;
});