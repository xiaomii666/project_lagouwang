require(["../config"], function() {
    require(["jquery", "template", "header"], ($, template) => {
        $(function() {
            function Position() {
                this.init();
            }
            $.extend(Position.prototype, {
                init() {
                    $(".collapse ul li").eq(1).addClass("active").siblings().removeClass("active");
                    $("#page_up").click(function() {
                        this.loadPage();
                    }.bind(this));
                    $("#page_next").click(function() {
                        this.loadPage();
                    }.bind(this));
                    this.loadPage();
                    this.addListener();
                },
                //注册事件监听
                addListener() {
                    //添加职位
                    $(".btn-addPosition").on("click", this.addPositionHandler);
                    //点击翻页//$.proxy(this.paginationHandler,this)
                    $("#pagination").on("click", ".Page_a", this.paginationHandler.bind(this));
                    //点击修改
                    $(".list_body").on("click", ".btn-modify", this.modifyHandler.bind(this));
                },
                //添加的处理
                addPositionHandler() {
                    const url = "http://rap2api.taobao.org/app/mock/124733/api/positions/add.do";
                    /*const data = $(".form-addPosition").serialize();//处理普通文本数据
                    $.post(url, data, (res) => {
                        console.log(res);
                    }) */
                    //利用formData方法上传文件  //必须post方式
                    const formdata = new FormData(document.querySelector(".form-addPosition"));
                    $.ajax({
                        type: "post",
                        url: url,
                        data: formdata,
                        contentType: false, // 不使用默认的 "application/x-www-form-urlencoded" 类型
                        processData: false, // 不处理 data 对象数据
                        success: (res) => {
                            console.log(res);
                        }
                    });
                },
                //分页加载
                loadPage(page = 1) {
                    const url = "http://rap2api.taobao.org/app/mock/124733/api/positions/list.do?page=" + page;
                    $.getJSON(url, (res) => {
                        const html = template("list-template", { list: res.res_body.data });
                        $(".list_body").html(html);
                    });
                },
                //翻页处理
                paginationHandler(event) {
                    $(event.target).parent("li").addClass("active").siblings().removeClass("active");
                    const page = $(event.target).text();
                    this.loadPage(page);
                },
                //修改数据
                modifyHandler(event) {
                    //先获得修改的原数据
                    const $tr = $(event.target).parents("tr");
                    const _id = $tr.data("id"), //主键
                        logo = $tr.find(".logo").attr("src"), //logo
                        cPosition = $tr.find(".cposition").text(),
                        company = $tr.find(".company").text(),
                        address = $tr.find(".address").text(),
                        salary = $tr.find(".salary").text();
                    $("#modifyName").val(cPosition);
                    $("#modifyFirm").val(company);
                    $("#modifyPlace").val(address);
                    $("#modifyMoney").val(salary);
                    $("#modifyinput").val(_id);
                    $("#form-logo").text(logo);
                }
            });
            return new Position();
        });
    });
});