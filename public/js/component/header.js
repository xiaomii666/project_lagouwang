define(["jquery", "login", "register", "bootstrap"], function($, Log, Reg) {
    $(function() {
        function Header() {
            this.createDom();
            this.loaduser();
            this.addListener();
        }
        Header.template = `<nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <a class="navbar-brand" href="http://localhost:3000">拉勾网管理系统</a>
            </div>
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li class="active"><a href="/index.html">首页 <span class="sr-only">(current)</span></a></li>
                    <li><a href="/html/Position.html">职位管理</a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right login_not">
                    <li data-toggle="modal" data-target="#login_myModal"><a href="#">登录</a></li>
                    <li data-toggle="modal" data-target="#register_myModal"><a href="#">注册</a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right login_success hidden">
                    <li><span>欢迎您，</span><a href="#"></a></li>
                    <li><a href="#" class="login_out">注销</a></li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container-fluid -->
    </nav>`;
        $.extend(Header.prototype, {
            //DOM节点
            createDom() {
                $("header").append(Header.template);
            },
            //模态框
            createModal() {
                new Log();
                new Reg();
            },
            //加载用户信息
            loaduser() {
                //从seesionstorage中获取
                const user = sessionStorage.logUser;
                if (user) {
                    $(".login_success").removeClass("hidden")
                        .find("a:first").text(user).end()
                        .siblings(".login_not").remove();
                } else {
                    this.createModal();
                }
            },
            //监听注册事件
            addListener() {
                $(".login_out").on("click", this.logoutHandler);
            },
            logoutHandler() {
                const url = "http://rap2api.taobao.org/app/mock/124733/api/users/logout.do";
                $.get(url, (res) => {
                    //删除本地的存储数据
                    sessionStorage.removeItem("logUser");
                    location.href = "/";
                });
            }
        })
        return new Header();
    });
});