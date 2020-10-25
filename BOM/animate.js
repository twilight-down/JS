function animate(obj, target, callback) { //封装函数
    clearInterval(obj.timmer); //避免多次点击按钮导致动画运行多个定时器  清除以前的定时器只保留当前这一个定时器
    obj.timmer = setInterval(function() {
        var step = (target - obj.offsetLeft) / 10; //计算步长使动画达到减速效果   同时避免出现小数的情况
        step = step > 0 ? Math.ceil(step) : Math.floor(step); //避免距离是负值的时候向上取整无法回到原来的位置
        if (obj.offsetLeft == target) {
            clearInterval(obj.timmer);
            if (callback) {
                callback();
            } //  ======  callback&&calback(); 短路运算 和上面的if完全等价 并且更加节省代码行
        }
        obj.style.left = obj.offsetLeft + step + 'px';

    }, 15);
}