define(["jquery", "login", "register", "bootstrap"], function($, Log, Reg) {
    $(function() {
        function Header() {
            this.createDom();
            this.createModal();
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
                <ul class="nav navbar-nav navbar-right">
                    <li data-toggle="modal" data-target="#login_myModal"><a href="#">登录</a></li>
                    <li data-toggle="modal" data-target="#register_myModal"><a href="#">注册</a></li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container-fluid -->
    </nav>`;
        $.extend(Header.prototype, {
            createDom() {
                $("header").append(Header.template);
            },
            createModal() {
                new Log();
                new Reg();
            }
        })
        return new Header();
    });
});