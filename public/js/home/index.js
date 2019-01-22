require(["../config"], function() {
    require(["jquery", "bootstrap", "header"], function() {
        $(function() {
            //构造函数
            function Index() {
                this.loadChart();
            }
            //扩展原型
            $.extend(Index.prototype, {
                loadChart() {}
            });
            return new Index();
        })
    });
});