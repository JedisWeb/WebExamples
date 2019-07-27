function init() {
    addImg();
}
init();
var flag = true;
var len, img;

function addImg() {
    for (var i = 0; i < 140; i++) {
        var src = Math.floor(Math.random() * 10);
        $('.imgBox').append('<img src ="pic/' + src + '.jpg" alt = ""/>');
    }
    bindEvent();
}

function bindEvent() {
    img = $('img');
    len = $('img').length;
    $('.btn').on('click', function () {
        if (!flag) {
            return;
        }
        var endNum = 0;
        flag = false;
        for (var i = 0; i < len; i++) {
            (function (i) {
                setTimeout(function () {
                    monition(img[i], '1s', function () {
                        $(this).css('transform', 'scale(0)')
                    }, function () {
                        monition(this, '1s', function () {
                            $(this).css({
                                'transform': 'scale(1)',
                                'opacity': 0
                            })
                        }, function () {
                            endNum++;
                            if (endNum == len) {
                                show();
                            }
                        })
                    })
                }, Math.random() * 1000);
            })(i);
        }
    })
}

function show(){
    var allEnd = 0;
    for(var i = 0; i < len; i ++){
        $(img[i]).css({
            'transition' : '',
            'transform': 'rotateY(0deg) translateZ(-' + Math.random() * 500 + 'px)'
        });
        (function (i){
            setTimeout(function(){
                monition(img[i],'3s',function(){
                    $(this).css({
                        'opacity':1,
                        'transform': 'rotateY(-360deg) translateZ(0)'
                    })
                },function(){
                    allEnd ++;
                    if(allEnd == len){
                        flag = true;
                    }
                })
            },Math.random() *1000);
        })(i)
    }
}

function monition(dom, time, doFun, cb) {
    $(dom).css('transition', time);
    doFun.call(dom);
    var called = true;
    $(dom).on('transitionend', function () {
        if (called) {
            cb && cb.call(dom);
            called = false;
        }
    })

}