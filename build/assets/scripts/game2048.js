/**
 * Created by yuanzai on 17/7/10.
 */
var option ={
    //默认选项
        width :4,
        height: 4,
        style:{
            background_color:"rgb(184,175,158)",
            block_background_color:"rgb(204,192,178)",
            padding:18,
            block_size:100,
            block_style:{
                "font-family": "微软雅黑",
                "font-weight": "bold",
                "text-align": "center"
            }
        },
        blocks:[
            {level: 0, value: 2, style:{ "background-color": "rgb(238,228,218)", "color":"rgb(124,115,106)", "font-size": 58 }},
            {level: 1, value: 4, style:{ "background-color": "rgb(236,224,200)", "color":"rgb(124,115,106)", "font-size": 58 }},
            {level: 2, value: 8, style:{ "background-color": "rgb(242,177,121)", "color":"rgb(255,247,235)", "font-size": 58 }},
            {level: 3, value: 16, style:{ "background-color": "rgb(245,149,99)", "color":"rgb(255,250,235)", "font-size": 50 }},
            {level: 4, value: 32, style:{ "background-color": "rgb(244,123,94)", "color":"rgb(255,247,235)", "font-size": 50 }},
            {level: 5, value: 64, style:{ "background-color": "rgb(247,93,59)", "color":"rgb(255,247,235)", "font-size": 50 }},
            {level: 6, value: 128, style:{ "background-color": "rgb(236,205,112)", "color":"rgb(255,247,235)", "font-size": 42 }},
            {level: 7, value: 256, style:{ "background-color": "rgb(237,204,97)", "color":"rgb(255,247,235)", "font-size": 42 }},
            {level: 8, value: 512, style:{ "background-color": "rgb(236,200,80)", "color":"rgb(255,247,235)", "font-size": 42 }},
            {level: 9, value: 1024, style:{ "background-color": "rgb(237,197,63)", "color":"rgb(255,247,235)", "font-size": 34 }},
            {level: 10, value: 2048, style:{ "background-color": "rgb(238,194,46)", "color":"rgb(255,247,235)", "font-size": 34 }},
            {level: 11, value: 4096, style:{ "background-color": "rgb(61,58,51)", "color":"rgb(255,247,235)", "font-size": 34 }}
        ],
        animateSpeed: 200
    };
var state =[];

var utils = {
    getPosition : function (x,y) {
        return {
            top: y*(option.style.padding+option.style.block_size)+option.style.padding,
            left: x*(option.style.padding+option.style.block_size)+option.style.padding
        }
    },
    getIndex: function (x,y) {
        return x+y*option.width;

    },
    getCoordinate: function (index) {
        return{
            x:index%option.width,
            y:Math.floor(index/option.width)
        }
    }
};

function Container(id) {
    var state = [];
    var wrap = $("#"+id);
    var animatedElementCount = 0;
    var animatedCallback = null;

    for(var x =0;x<option.width;x++){
        for(var y= 0;y<option.height;y++){
            var blockdom = $("<div>");
            var position = utils.getPosition(x,y);
            blockdom.css({
                "width":option.style.block_size,
                "height":option.style.block_size,
                "background-color":option.style.block_background_color,
                "position" :"absolute",
                "top": position.top,
                "left":position.left
            });
            wrap.append(blockdom);
            state.push(null);

        }
    }

    //大背景样式
    wrap.css({
        "width" : (option.style.block_size+option.style.padding)*option.width+option.style.padding+"px",
        "height" : (option.style.block_size+option.style.padding)*option.height+option.style.padding+"px",
        "border-radius":option.style.padding,
        "position":"relative",
        "background-color":option.style.background_color
    });


    return {

        getEmptyIndex : function () {
            var emptyBlockIndexs = [];
            $(state).each(function (i, o) {
                if (o == null) {
                    emptyBlockIndexs.push(i)
                }
            });
            return emptyBlockIndexs[Math.floor(Math.random() * emptyBlockIndexs.length)]
        },

        setBlock: function (index,block) {
            state[index]=block;
            if (block) wrap.append(block.dom);
        },

        updateBlock: function (originIndex, direction, step) {
            if (state[originIndex] == null) return;
            // console.group(originIndex, direction)
            var moveX, moveY;
            switch (direction) {
                case "up":
                    moveX = 0, moveY = -1;
                    break;
                case "down":
                    moveX = 0, moveY = 1;
                    break;
                case "left":
                    moveX = -1, moveY = 0;
                    break;
                case "right":
                    moveX = 1, moveY = 0;
                    break;
            }
            var originX, originY, originCoor, originBlock;
            var targetX, targetY, targetBlock = null;
            var moved = false;
            originCoor = utils.getCoordinate(originIndex);
            originX = originCoor.x, originY = originCoor.y;
            originBlock = this.getBlock(originX, originY);
            targetX = originX + moveX, targetY = originY + moveY;
            while (true) {
                if ((targetBlock = this.getBlock(targetX, targetY)) != null) break;
                if (targetX + moveX < 0) break;
                if (targetY + moveY < 0) break;
                if (targetX + moveX > option.width - 1) break;
                if (targetY + moveY > option.height - 1) break;
                targetX += moveX, targetY += moveY, moved = true;
            }
            // console.log("start", targetX, targetY, targetBlock == null ? null : targetBlock.data.level);
            if (targetBlock == null) {
                originBlock.move(targetX, targetY);
                moved = true;
            } else if (targetBlock.canMerge(originBlock, step)) {
                originBlock.removeData();
                targetBlock.updateData();
                originBlock.moveAnimateion(targetX, targetY).then(function () {
                    targetBlock.updateAnimation();
                    originBlock.removeAnimation();
                })
                moved = true;
            } else if (moved) {
                originBlock.move(targetX - moveX, targetY - moveY);
            }
            // console.log("end", targetX, targetY, targetBlock == null ? null : targetBlock.data.level);
            // console.groupEnd()
            return moved;
        },
        isInAnimate: function () {
            return animatedElementCount > 0;
        },
        getBlock: function (x, y) {
            if (y == undefined) {
                return state[x]
            } else {
                return state[utils.getIndex(x, y)];
            }
        },

        registAnimate: function () {
            animatedElementCount++;
        },
        finishAnimate: function () {
            animatedElementCount--;
            if (animatedElementCount == 0 && animatedCallback != null) {
                animatedCallback();
                animatedCallback = null;
            }
        },
        afterAllAnimateCompleted: function (callback) {
            if (animatedElementCount == 0) callback();
            else animatedCallback = callback;
        },
        isInAnimate: function () {
            return animatedElementCount > 0;
        },
        isOver: function () {
            for (var x = 0; x < option.width; x++) {
                for (var y = 0; y < option.height; y++) {
                    var origin = state[utils.getIndex(x, y)];
                    if(origin == null) return false;
                    var target;
                    if (x > 0) {
                        target = state[utils.getIndex(x - 1, y)];
                        if (target == null || target.canMerge(origin)) {
                            return false;
                        }
                    }
                    if (x < option.width - 1) {
                        target = state[utils.getIndex(x + 1, y)];
                        if (target == null || target.canMerge(origin)) {
                            return false;
                        }
                    }
                    if (y > 0) {
                        target = state[utils.getIndex(x, y - 1)];
                        if (target == null || target.canMerge(origin)) {
                            return false;
                        }
                    }
                    if (y < option.height - 1) {
                        target = state[utils.getIndex(x, y + 1)];
                        if (target == null || target.canMerge(origin)) {
                            return false;
                        }
                    }
                }
            }
            return true;
        },
        reset: function(){
            state = state.map(function(o){
                if(o){
                    o.dom.remove();
                }
                return null;
            })
        },
        getScore: function(){
            var score = 0;
            state.map(function(o){
                if(o != null){
                    score += Math.pow(2, o.data.level + 1);
                }
            })
            return score;
        }
    }
}
function Block(container,level) {
    level = (level == undefined ? Math.floor(Math.random() * 2) : level);
    var dom = $("<div>");
    var data = option.blocks[level];
    var index = container.getEmptyIndex();
    var coordinate = utils.getCoordinate(index);
    var lastMergedStep = -1;

    dom.css($.extend(option.style.block_style, {
        "position": "absolute",
        "line-height": option.style.block_size + "px"
    },data.style));
    dom.html(data.value);


    return {

        coordinate: coordinate,
        dom: dom[0],
        data: data,
        removeData: function () {
            container.setBlock(index, null);
            return this;
        },
        removeAnimation: function () {
            var position = utils.getPosition(this.coordinate.x, this.coordinate.y);
            // dom.animate({
            //   "width": 0,
            //   "height": 0,
            //   "top": position.top + option.style.block_size / 2,
            //   "left": position.left + option.style.block_size / 2,
            //   "line-height": 0,
            //   "font-size": 0
            // }, option.animateSpeed, function () {
            //   dom.remove();
            // })
            container.registAnimate(
                dom.animate({
                    "opacity": 0
                }, option.animateSpeed, function (evt) {
                    dom.remove();
                    container.finishAnimate.apply(this, arguments);
                })
            )
            return this;
        },
        remove: function () {
            return this.removeData().removeAnimation();
        },
        addData:function (x,y) {
            this.coordinate = { x: x, y: y };
            container.setBlock(index, this);
            //为甚么return this.
            console.log(this);
            return this;
        },


        addAnimation:function (x,y) {
            var position = utils.getPosition(x,y);
            dom.css({
                "width":0,
                "height":0,
                "top":position.top+option.style.block_size/2,
                "left":position.left+option.style.block_size/2,
                "font-size":0,
                "line-height": 0
            });
            /*container.animate()*/
                dom.animate({
                    "width": option.style.block_size,
                    "height": option.style.block_size,
                    "top": position.top,
                    "left": position.left,
                    "font-size": data.style["font-size"],
                    "line-height": option.style.block_size + "px"
                }, option.animateSpeed);
            //为甚么return this.
            return this;
        },


        add:function (x,y) {
            if(x!=undefined&&y!=undefined){
                index = utils.getIndex(X,Y);
            }
            var coor = utils.getCoordinate(index);
            x=coor.x;
            y=coor.y;
            return this.addData(x,y).addAnimation(x,y);

        },
        move: function (x, y) {
            if (y == undefined) {
                coor = utils.getCoordinate(x);
                x = coor.x;
                y = coor.y;
            }
            return this.moveAnimateion(x, y).moveData(x, y);
        },
        moveAnimateion: function (x, y) {
            var oldCoor = utils.getCoordinate(index);
            var position = utils.getPosition(x, y);
            container.registAnimate(
                dom.animate({
                    "left": position.left
                }, option.animateSpeed / 2 * Math.abs(oldCoor.x - x), 'linear').animate({
                    "top": position.top
                }, option.animateSpeed / 2 * Math.abs(oldCoor.y - y), 'linear', container.finishAnimate)
            );
            return this;
        },
        moveData: function (x, y) {
            this.coordinate = { x: x, y: y };
            var newIndex = utils.getIndex(x, y);
            container.setBlock(index, null);
            container.setBlock(newIndex, this);
            index = newIndex;
            return this;
        },
        updateAnimation: function (newLevel) {
            (function (data) {
                container.registAnimate(
                    dom.animate({
                        "top": "-=" + option.style.block_shake_size / 2,
                        "left": "-=" + option.style.block_shake_size / 2,
                        "width": option.style.block_size + option.style.block_shake_size,
                        "height": option.style.block_size + option.style.block_shake_size,
                        "line-height": option.style.block_size + option.style.block_shake_size + "px",
                        "font-size": data.style["font-size"] + 3
                    }, option.animateSpeed / 2).queue(function (next) {
                        dom.html(data.value);
                        dom.css("background-color", data.style["background-color"])
                        dom.css("color", data.style["color"])
                        next();
                    }).animate({
                        "top": "+=" + option.style.block_shake_size / 2,
                        "left": "+=" + option.style.block_shake_size / 2,
                        "width": option.style.block_size,
                        "height": option.style.block_size,
                        "line-height": option.style.block_size + "px",
                        "font-size": data.style["font-size"]
                    }, option.animateSpeed / 2, container.finishAnimate)
                )
            })(newLevel == undefined ? data : option.blocks[newLevel]);
            return this;
        },
        updateData: function (newLevel) {
            if (newLevel == undefined) level++;
            else level = newLevel;
            this.data = data = option.blocks[level];

            container.setBlock(index, this);
            return this;
        },
        update: function (newLevel) {
            return this.updateData(newLevel).updateAnimation(newLevel);
        },
        canMerge: function (target, step) {
            if (this.data == target.data && lastMergedStep != step) {
                if (step != undefined) lastMergedStep = step;
                return true;
            }
            return false;
        },
        then: function (callback) {
            dom.queue(function (next) {
                callback();
                next();
            })
        }



    }

}

function Game2048(id) {
    var dom = $("#" + id);
    var container = new Container(id);
    var step = 0;
    var mouseStartPoint = null;
    //move 1、定义鼠标触发事件
    var mouseHandler = function (evt) {
        if (evt.type == "mousedown" && mouseStartPoint == null) {
            mouseStartPoint = { x: evt.pageX, y: evt.pageY };
        }
        if (evt.type == "mouseup") {
            var xDistance = evt.pageX - mouseStartPoint.x;
            var yDistance = evt.pageY - mouseStartPoint.y;
            if (Math.abs(xDistance) + Math.abs(yDistance) > 20) {
                if (Math.abs(xDistance) >= Math.abs(yDistance)) {
                    if (xDistance > 0) {
                        //2、定义鼠标滑动时事件的反馈
                        move("right");
                    } else {
                        move("left");
                    }
                } else {
                    if (yDistance > 0) {
                        move("down");
                    } else {
                        move("up");
                    }
                }
            }
            mouseStartPoint = null;
        }
    }.bind(this);

    //move 1、定义键盘触发事件
    var keyHandler = function (evt) {
        switch (evt.which) {
            case 38:
            case 87:
                //1、定义键盘按下时事件的反馈
                move("up");
                break;
            case 40:
            case 83:
                move("down");
                break;
            case 37:
            case 65:
                move("left");
                break;
            case 39:
            case 68:
                move("right");
                break;
        }
    }.bind(this);

    //2、进入move方法
    var move = function (direction) {
        // console.log("move start", direction)
        // container.output();
        if (container.isInAnimate()) return;
        var actived = false;
        switch (direction) {
            case "up":
                for (var x = 0; x < option.width; x++) {
                    for (var y = 1; y < option.height; y++) {
                        actived = container.updateBlock(utils.getIndex(x, y), direction, step) || actived;
                    }
                }
                break;
            case "down":
                for (var x = 0; x < option.width; x++) {
                    for (var y = option.height - 2; y >= 0; y--) {
                        actived = container.updateBlock(utils.getIndex(x, y), direction, step) || actived;
                    }
                }
                break;
            case "left":
                for (var x = 1; x < option.width; x++) {
                    for (var y = 0; y < option.height; y++) {
                        actived = container.updateBlock(utils.getIndex(x, y), direction, step) || actived;
                    }
                }
                break;
            case "right":
                for (var x = option.width - 2; x >= 0; x--) {
                    for (var y = 0; y < option.height; y++) {
                        actived = container.updateBlock(utils.getIndex(x, y), direction, step) || actived;
                    }
                }
                break;
        }
        if (actived) {
            step++;
            container.afterAllAnimateCompleted(function () {
                if (container.getEmptyIndex() != undefined) {
                    new Block(container).add();
                }
                if (container.isOver()) {
                    gameOver();
                }
            })
        }
        // console.log("move end", direction)
        // container.output();
    }

    var gameStart = function () {
        $("#endMask").remove();
        container.reset();
        new Block(container).add();
        new Block(container).add();
        //move起点
        $(document).on("keydown", keyHandler);
        $(document).on("mousedown", mouseHandler);
        $(document).on("mouseup", mouseHandler);
    };
    var gameOver = function () {
        $(document).off("keydown", keyHandler);
        $(document).off("mousedown", mouseHandler);
        $(document).off("mouseup", mouseHandler);

        var score = container.getScore();
        var $endMask = $("<div></div>");
        var $mask = $("<div></div>")
        $mask.css({
            "background-color": option.style.background_color,
            "border-radius": option.style.padding,
            "position": "absolute",
            "-webkit-user-select": "none",
            "opacity": 0.5,
            "width": (option.style.block_size + option.style.padding) * option.width + option.style.padding,
            "height": (option.style.block_size + option.style.padding) * option.height + option.style.padding
        })
        var $title = $("<h1>游戏结束</h1>");
        var $result = $("<p>您的分数::" + score + "<br />总共经历的步数:" + step +"</p>");
        var $again = $("<button>再玩一次</button>");
        $again.click(function (evt) {
            evt.preventDefault();
            gameStart();
        })
        var $content = $("<div></div>");
        $content.css({
            "width": "200px",
            "text-align": "center",
            "margin": "0 auto",
            "position": "absolute",
            "top": "50%",
            "transform": "translate(-50%, -50%)",
            "left": "50%",
            "padding": 10,
            "background-color": option.style.block_background_color
        })
        $endMask.append($mask)
        $content.append($title);
        $content.append($result);
        $content.append($again);
        $endMask.append($content);
        $endMask.attr("id", "endMask");
        dom.append($endMask);
    }
    return {
        start: gameStart,
        end: gameOver,
        move: move,
        container: container
    }


}






/*
    //保存游戏数据
    var state = [];

    if(this.length >1) throw "一次只能开始一个游戏";
    if(this.length == 0) throw "未找到游戏容器";

    var $this = $(this[0]);

    //设定大背景
    $this.css({
        "background-color": option.style.background_color,
        "border-radius": option.style.padding,
        "position":"relative",
        "-webkit-user-select": "none"
    });

    //得到每个小方块相对于背景的位置
    var getPosition = function (x,y) {
        return{
            "top":option.style.padding + y*(option.style.block_size+option.style.padding),
            "left":option.style.padding + x*(option.style.block_size+option.style.padding)
        }
    };


    //得到将要移动的块的坐标

    var getIndex = function (x,y) {
        return x+y*option.width;

    };

    //
    var getBlock = function (x,y) {
        return state[getIndex(x,y)];
    };
    //得到所有的block块
    var getEmptyBlockIndexs = function () {
        var emptyBlockIndexs = [];
        $(state).each(function (i,o) {
            if(o == null) emptyBlockIndexs.push(i);
        });
        return emptyBlockIndexs;
    };

    //得到所有位置的xy轴
    var getCoordinate = function (index) {
        return {
            x: index % option.width,
            y: Math.floor(index / option.width)
        }
    };


    var getIndex = function (x,y) {
        return x+y * option.width
    };

    //创建背景上的小方块
    var buildBackground = function () {
        var backgrounds =[];
        for(var x=0; x<option.width;x++){
            for(var y=0; y<option.height;y++){
                state.push(null);
                var bg_block =$("<div></div>");
                var position = getPosition(x,y);
                bg_block.css({
                    "width": option.style.block_size,
                    "height":option.style.block_size,
                    "background-color":option.style.block_background_color,
                    "position": "absolute",
                    "top": position.top,
                    "left": position.left
                });
                //线下组装
                backgrounds.push(bg_block);
            }
        }
        //将小方块放到父级DIV
        $this.append(backgrounds);
        //撑开父级div
        $this.width((option.style.block_size+option.style.padding)*option.width + option.style.padding);
        $this.height((option.style.block_size+option.style.padding)*option.height + option.style.padding);
    };


    //生成数字块
    var buildBlock = function (level, x,y) {

        //得到所有空块
        var emptyBlockIndexs = getEmptyBlockIndexs();

        //如果没有空块
        if(emptyBlockIndexs.length == 0) return false;

        //在空块中随机抽取一个空块所在的索引
        var putIndex;

        //通过xy转index
        if(x!=undefined&& y !=undefined){
            putIndex = getIndex(x,y);
        }else{
            putIndex = emptyBlockIndexs[Math.floor(Math.random() * emptyBlockIndexs.length)];
        }


        var block;
        if(level != undefined){
            block = $.extend({},option.blocks[level]);
        }else{
            block=$.extend({},Math.random() >= 0.5 ? option.blocks[0] :option.blocks[1]);
        }
        //随机生成2或4
        var block = Math.random() >= 0.5 ? option.blocks[0] :option.blocks[1];

        //得到要放的2或4的坐标
        var coordinate = getCoordinate(putIndex);

        //得到要放的小方块相对于背景的位置
        var position = getPosition(coordinate.x,coordinate.y);


        //
        var blockDom = $("<div></div>");

        blockDom.addClass("block_" + coordinate.x + "_" + coordinate.y);
        blockDom.css($.extend(option.style.block_style, {
            "position" : "absolute",
            "top": position.top +option.style.block_size/2,
            "left": position.left +option.style.block_size/2,
            "width": 0,
            "height": 0
        },block.style));

        //加到dom里
        $this.append(blockDom);
        //修改游戏数据
        state[putIndex] = block;

        blockDom.animate({
            "width": option.style.block_size,
            "height": option.style.block_size,
            "line-height": option.style.block_size +"px",
            "top":position.top,
            "left":position.left
        }, option.animateSpeed, (function(blockDom) {
            return function () {
                blockDom.html(block.value);
            }
        })(blockDom));

        //移动方法
        var move = function (direction) {
            switch(direction){
                case "up":
                    for(var x= 0 ; x<option.width;x++){
                        for(var y= 1 ; y<option.width;y++){
                            var block = getBlock(x,y);
                            if(block == null) continue;
                            //得到上一个的坐标
                            var target_coordinate = {x:x, y :y-1};
                            //得到上一个的索引
                            var target_block = getBlock(target_coordinate.x,target_coordinate.y);

                            var moved = 0;

                            while (target_coordinate.y > 0 && target_block == null){
                                target_coordinate.y = target_coordinate.y-1;
                                target_block = getBlock(target_coordinate.x,target_coordinate.y);
                                if(++moved > Math.max(option.width, option.height)) break;
                            }

                        }
                    }
                    break;
                case "down":
                    break;
                case "left":
                    break;
                case "right":
                    break;
            }
        };

        return true;
    };
    buildBackground();
    buildBlock();
    buildBlock();





for(var i =0;i<10;i++){
    setTimeout(function () {
        console.log(i);
    },i*1000);
}


for(var i =0;i<10;i++){
    setTimeout((function (i) {
        return function(){
            console.log(i);
        }
    })(i),i*1000);
}*/
