require.config({ //定义模块
    baseUrl: "/",
    paths: {
        jquery: "libs/jquery/jquery-1.12.4.min",
        bootstrap: "libs/bootstrap/js/bootstrap.min",
        swiper: "libs/swiper/js/swiper.min",
        header: "js/component/header",
        login: "js/component/login-modal",
        register: "js/component/register-modal"
    },
    //垫片、不符合AMD规范的
    shim: {
        bootstrap: {
            deps: ["jquery"]
        }
    }
});