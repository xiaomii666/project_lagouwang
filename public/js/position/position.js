require(["../config"], function() {
    require(["header"], () => {
        $(function() {
            function Position() {
                this.init();
            }
            $.extend(Position.prototype, {
                init() {
                    $(".collapse ul li").eq(1).addClass("active").siblings().removeClass("active");
                }
            });
            return new Position();
        });
    });
});