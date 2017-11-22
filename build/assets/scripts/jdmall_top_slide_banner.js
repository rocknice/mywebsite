$(function() {

    let $parent = $(".slide-banner");
    let $item = $parent.find(".sb-wrap li");
    let $nav = $parent.find(".sb-nav li");
    let index = 0;
    // 移除顶部banner
    $(".rm-banner").click(function() {
            let $parent = $(this).parents(".head-banner");
            $parent.remove();
        })
        //向后 按钮
    $(".sb-btn .page-next").click(function() {
            index += 1;
            if (index > 4) {
                $item.eq(0).addClass("current").siblings().removeClass("current");
                $nav.eq(0).addClass("current").siblings().removeClass("current");
                index = 0;
            } else {
                $item.eq(index).addClass("current").siblings().removeClass("current");
                $nav.eq(index).addClass("current").siblings().removeClass("current");
            }
        })
        //往前 按钮
    $(".sb-btn .page-prev").click(function() {
            index -= 1;
            if (index < 0) {
                $item.eq(4).addClass("current").siblings().removeClass("current");
                $nav.eq(4).addClass("current").siblings().removeClass("current");
                index = 4;
            } else {
                $item.eq(index).addClass("current").siblings().removeClass("current");
                $nav.eq(index).addClass("current").siblings().removeClass("current");
            }
        })
        // 悬浮导航按钮 切换banner
    let f = "";
    for (let i = 0; i < $nav.length; i++) {
        $nav.eq(i).hover(function() {
            if (f) {
                clearTimeout(f);
            }
            f = setTimeout(function() {
                $nav.eq(i).addClass("current").siblings().removeClass("current");
                $item.eq(i).addClass("current").siblings().removeClass("current");
            }, 350)
        })
    }
    // 自动切换banner
    let i = 1;

    function autoPlay() {　　
        t = setInterval(function() {
            $nav.eq(i).addClass("current").siblings().removeClass("current");
            $item.eq(i).addClass("current").siblings().removeClass("current");
            i++;
            if (i > 4) {
                i = 0;
            }　　
        }, 4000);
    }
    autoPlay();
    $item.hover(function() {
        clearInterval(t);
    }, function() {
        autoPlay();
    });


})