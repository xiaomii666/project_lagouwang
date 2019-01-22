define(["jquery"], function() {
    function LoginModal() {
        this.createDOM();
        this.addListeners();
    }
    String.prototype.IsUserName = function() { //登录验证用户名
        return (/^[\u4E00-\u9FA5a-zA-Z0-9_]*$/).test(this);
    }
    String.prototype.IsEmail = function() { //验证邮箱   
        return (/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(this));
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
                    <div class="alert alert-danger hidden  login-error"></div>
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
        addListeners() {
            $("#login_password").on('keydown', (e) => { //回车键登录
                if (e.keyCode == 13) {
                    this.logHandler();
                }
            });
            $(".btn-login").on("click", this.logHandler);
        },
        //登录处理
        logHandler() {
            //DOTO、处理登录验证
            var
                $username = $("#login_username"),
                $password = $("#login_password");
            /* $username.on("blur", () => {
                if ($username.val() === "") {
                    $("#login_username").focus();
                    $(".login-error").removeClass("hidden").text("不输，你试试");
                } else {
                    $(".login-error").addClass("hidden").text("");
                }
            }); */
            var b = "1652270921@qq.com";
            console.log(b.IsEmail());

            const
                url = "http://rap2api.taobao.org/app/mock/124733/api/users/login.do",
                data = $(".form-login").serialize();
            $.post(url, data, (res) => {
                if (res.res_body === 0) { //用户名或密码错误
                    console.log("失败");
                    $(".login-error").text("登录失败！").removeClass("hidden");
                } else { //登录成功
                    console.log("成功");
                    $("#login_myModal").modal("hide");
                    sessionStorage.logUser = res.res_body.data.username;
                    location.reload();
                }
            }, "json");
        }
    });
    return LoginModal;
});