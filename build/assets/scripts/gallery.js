/**
 * Created by yuanzai on 17/6/27.
 */
function Gallery(id,option) {
    var container = document.getElementById(id);
    if(!~container.className.indexOf("xy-gallery") == -1){
        container.className = " xy-gallery";
    }

    var defaultOption = {
        defaultWidth :130,
        defaultHeight :40,
        activeWidth: 340,
        activeHeight: 400,
        animationDuration:300
    };

    //如果传入的参数和已有的对象中的属性值重复，将合并
    option = Object.assign({},defaultOption,option);
    //设置容器的宽度
    container.style.width = option.activeWidth+option.defaultWidth*(option.width-1)+"px";

    //设置延时函数
    var lastRunTime = new Date(0);
    var runId = 0;

    //总函数
    var activePicture = function(index) {
        //设置延时函数
        var currentTime = new Date();
        clearTimeout(runId);
        if(currentTime - lastRunTime < option.animationDuration){
        runId = setTimeout(function () {
            activePicture(index);
            },option.animationDuration);
            return;
        }
        lastRunTime = currentTime;

        //将当前选中的图片顺序索引转化为坐标
        var cx = index%option.width;
        var cy = Math.floor(index/option.width);

        //将所有图片顺序索引转化为坐标
        for(var y = 0;y < option.height;y++){
            for(var x = 0;x < option.width;x++){
                //再将坐标转化为索引
                var cindex = y*option.width+x;
                //将索引赋值给div元素
                var item = container.children[cindex];
                //分别设定四种div的大小
                if(x==cx && y==cy){
                    item.className = "active";
                    item.style.width = option.activeWidth+"px";
                    item.style.height = option.activeHeight+"px";
                }else if(x==cx){
                    item.className = "";
                    item.style.width = option.activeWidth+"px";
                    item.style.height = option.defaultHeight+"px";
                }else if(y==cy){
                    item.className = "";
                    item.style.width = option.defaultWidth+"px";
                    item.style.height = option.activeHeight+"px";
                }else {
                    item.className = "";
                    item.style.width = option.defaultWidth+"px";
                    item.style.height = option.defaultHeight+"px";
                }
            }
        }
    };
    activePicture(0);


    //得到当前数组的每一元素和索引值，给元素附上事件，再将各元素对应的索引传递给i，再在事件函数中赋予activePicture
    Array.prototype.forEach.call(container.children, function (o, i) {
        o.addEventListener('mouseenter', function (evt) {
            activePicture(i);
        })
    });

    return {
        active:activePicture
    };
}


/*function Gallery(id,option) {
    //设置配置
    var defaultOption = {
        defaultWidth :130,
        defaultHeight :40,
        activeWidth: 340,
        activeHeight: 400,
        animationDuration:300
    };

    option = Object.assign({},defaultOption,option);

    var container = document.getElementById(id);
    container.style.width = option.activeWidth + option.defaultWidth*(option.width-1) +"px";

    var activePics = function(index) {
        var cx = index % option.width;
        var cy = Math.floor(index/option.width);
        for(var y = 0;y<option.height;y++){
            for(var x = 0;x<option.width;x++){
                var cindex = y*option.width + x;
                var pics = container.children[cindex];
                if(x==cx && y==cy){
                    pics.style.width = option.activeWidth + "px";
                    pics.style.height = option.activeHeight + "px";

                }
                else if(x==cx){
                    pics.style.width = option.activeWidth + "px";
                    pics.style.height = option.defaultHeight + "px";

                }
                else if(y==cy){
                    pics.style.width = option.defaultWidth + "px";
                    pics.style.height = option.activeHeight + "px";

                }else{
                    pics.style.width = option.defaultWidth + "px";
                    pics.style.height = option.defaultHeight + "px";
                }
            }
        }
    };
    activePics(0);

    Array.prototype.forEach.call(container.children, function (o, i) {
        o.addEventListener('mouseenter', function (evt) {
            activePics(i);
        })
    });
    return {
        active:activePics
    };
}*/
