var that;
class Tab {
    constructor(id) {
        that = this;
        this.main = document.querySelector(id);
        // this.remove = this.main.querySelectorAll('.icon-guanbi');
        // this.lis = this.main.querySelectorAll('li');
        // this.sections = this.main.querySelectorAll('section');
        this.add = this.main.querySelector('.tabadd');
        //li的父元素
        this.ul = this.main.querySelector('.fisrstnav ul:first-child');
        this.fsection = this.main.querySelector('.tabscon');
        this.init();

    }
    init() {
        this.updateNode();
        this.add.onclick = this.addTab;
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            this.remove[i].onclick = this.removeTab;
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;

        }
    }

    //由于获取的li和section都是在初始化之前获取的之后就无法获取到后面添加的li和section  还有小关闭按钮
    //所有需要再把后面添加的也获取到才可以对添加元素进行相关操作
    updateNode() {
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.remove = this.main.querySelectorAll('.icon-guanbi');
        this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child');

    }


    toggleTab() {
        that.claerClass();
        this.className = 'liactive';
        that.sections[this.index].className = 'conactive';
    }
    claerClass() {
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }
    addTab() {
        that.claerClass();
        var random = Math.random();
        var li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>';
        var section = '<section class="conactive">测试' + random + '</section>';
        that.ul.insertAdjacentHTML('beforeend', li);
        that.fsection.insertAdjacentHTML('beforeend', section);
        that.init();
    }
    removeTab(e) {
        e.stopPropagation(); //阻止冒泡 防止触发li的切换点击事件
        var index = this.parentNode.index; //this指的是 <span class="iconfont icon-guanbi"></span>
        //  也就是li 的子盒子 <li class="liactive">|$$$$<span>测试1</span><span class="iconfont icon-guanbi">$$$$|</span></li>
        that.lis[index].remove();
        that.sections[index].remove();
        that.init();
        //删除的不是选中状态的li时，原来选中状态的li不变
        if (document.querySelector('.liactive')) return;
        //删除的是选中状态的li是 将选中状态跳转至前一个li
        index--;
        that.lis[index] && that.lis[index].click(); // 666 防止index为-1 但是会继续调用这个函数而导致报错


        // console.log(index);
        // console.log(this);

    }
    editTab() {
        //this指的是span  也是指向section 谁调用就指向谁 input框是span的子盒子
        var str = this.innerHTML;
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty(); //取消双击选中文字
        this.innerHTML = '<input type="text" />';
        var input = this.children[0];
        input.value = str;
        input.select(); //让文本框中的文字出去选定状态
        input.onblur = function() { //离开文本框是将文本框中的内容给sapn
            this.parentNode.innerHTML = this.value;
        }
        input.onkeyup = function(e) { //按下回车也可以达到让文本内容给sapn
            if (e.keyCode === 13) {
                this.blur(); //不要加on
            }
        }
    }
}
new Tab('#tab');