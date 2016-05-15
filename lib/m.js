
var m = (function(){
    /**
     * function _reset
     *      对所选择的元素进行缩放与重新定位，使达到多分辨率一致的效果
     *
     * @params
     *      selector    要进行reset的元素
     *      initial     设计图尺寸
     *      callback    回调函数
     *
     */

    //获取窗口实际宽高

    var $wWidth = $(window).width(), $wHeight = $(window).height();
    var _reset = function(target, initial, callback){

        var $width = initial!=undefined ? initial.width : 640,
            $height = initial!=undefined ? initial.height : 1008,
            $target = $(target),
            $iR = $wWidth / $width;

        //改变比例，使页面尽可能多的显示内容，如果实际宽高比>=设计宽高比，则以高为100%定义缩放值
        if($wWidth/$wHeight >= $width/$height){
            $iR = $wHeight / $height;
        }

        // 判断$parent是否设置了position，若没有，则更改其为relative，
        // 无论怎样，都让selector相对其第一个父元素进行定位（避免坑爹行为————众多父元素中有一个设置了position属性而使位置不准确）
        // $parent = $target.parents().not(function (){
        //     return this.css.position == "static"
        // });

        var $parent = $target.parents().eq(0);

        console.log($parent);
        // if($parent.css("position") == "static"){
        //     $parent.css({
        //         "position" : "relative"
        //     })
        // }
        //对selector中每个元素重设w h x y
        $target.each(function(i, e){
            $(e).css({
                "position" : "absolute",
                "width" : $(e).attr("width") * $iR,
                "height" : $(e).attr("height") * $iR,
                "top" : $(e).attr("y") * $iR/* - $parent.offset().top + ($wHeight - $height * $iR)/2*//*当高度过高时，是否需要垂直居中显示*/,
                "left" : $(e).attr("x") * $iR/* -  $parent.offset().left + ($wWidth - $width * $iR)/2*/
            });
            //删除w h x y属性（强迫症）
            $(e).removeAttr("width");
            $(e).removeAttr("height");
            $(e).removeAttr("x");
            $(e).removeAttr("y");
        });
        if(callback && callback instanceof Function){
            //返回selector，可对selector进行下一步操作
            callback($target);
        }

    };


    /**
     * function _rotate
     *      实现对象的旋转效果（可用于抽奖等）
     *
     * @params:
     *      target      要进行rotate的对象
     *      prize       预设结束时停留的单位索引[0, total-1]，若为-1则随机分配
     *      total       转盘共有多少个单位（eg.抽奖活动中奖项总数）
     *      duration    动画持续时间
     *      callback    回调函数
     *
     *
     */
    var flag = false, index = 0;
    var _rotate = function(target, prize, total, duration, callback){
        var deg = 0;
        // 当prize == -1时，随机分配奖项
        if(prize == -1){
            index = Math.floor(Math.random()*total);
            prize = index;
        }
        // 计算要旋转的角度，在最后停留角度的基础上，使其每秒转2圈
        deg = 360/total*(total - prize) + 360*duration*2;
        console.log(deg);

        //if(!flag){

        TweenMax.to(target, duration, {
            rotation: deg, startAt: {css: {rotation: 0}}, ease:Quad.easeInOut, onComplete: function(){
                if(callback && callback instanceof Function){
                    callback(prize);
                }
            }
        });

        // 考虑是否允许手动停止.....然后放弃 > <

        //    flag = true;
        //}else{
        //    if(TweenMax.isTweening(target))
        //    {
        //        TweenMax.to(target, 2, {
        //            rotation: deg, overwrite: "all", startAt: {css: {rotation: 0}}, onComplete: function(){
        //                if(callback && callback instanceof Function){
        //                    callback(prize);
        //                }
        //            }
        //        });
        //        flag = false;
        //    }
        //}
    };

    var _fullPage = function(target, direction, options){

    };
    return {
        reset: _reset,
        rotate: _rotate,
        fullPage: _fullPage
    }
})();