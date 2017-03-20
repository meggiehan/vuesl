$(function(){
    auto();
    $(window).resize(function(){
        setTimeout(auto,300);
    })
    function auto(){
        $('.side .item').height($(window).height()-172);
        $('.wrap .main').height($(window).height());
    };
    /*side侧边菜单栏切换展开收缩效果*/
    var $lv2=$('.item .level2')
    var $lv1Arrow=$('.item .level1>li>a');

    $('.item .lv-btn').stop().on('click',function(){
        /*循环level2显示隐藏*/
        $.each($lv2,function(i,elem){
            $(elem).slideUp();
        })
        $(this).siblings('.level2').slideDown();
        /*循环改变lv-btn当前状态*/
        $.each($('.lv-btn'),function(i,elem){
            $(elem).removeClass('current');
        })
        $(this).addClass('current');
    })

    /*点击显示个人资料*/

    $('.main .geren>.box').on('click',function(){
        $(this).find('.down-box').fadeToggle('fast');
        return false;
    })
    $(document).on('click',function(){
        $('.down-box').fadeOut('fast');
        $('.down-m').fadeOut();
    })
    /*点击显示是否激活*/
    $('.tab .click-btn').on('click',function(){
        $.each($('.down-m'),function(i,elem){
            $(elem).fadeOut();
        })
        $(this).siblings('.down-m').fadeToggle();
        return false;
    })

    /*创建用户*/
    $('.build>.btn-info').on('click',function(){
        $('.main .layer').fadeIn();
    })
    $('.layer .btn-t .btn-danger').on('click',function(){
        $('.main .layer').fadeOut();
    })
    /*js实现单选按钮功能*/
    $circle=$('.main .layer .circle');
    $circle.on('click',function(){
        $.each($circle,function(i,elem){
            $(elem).removeClass('current')
        })
        $(this).addClass('current');
    })
    /*简单验证登录页面*/
    var $user=$(".form-group input[placeholder='用户名']");
    var $pass=$(".form-group input[placeholder='密码']");
    var $vali=$(".form-group input[placeholder='验证码']");
    $('.login-box .btn-info').on('click',function(){
        if($user.val()==''){
            alert(1)
        }else if($pass.val()==''){
            alert(2)
        }else if($vali.val()==''){
            alert(3)
        }
    })
    /*角色绑定页面上用户绑定tab选项卡*/
    var $tabLi = $('.layer .menu-hd>li');
    var $menuBox = $('.layer .menu-box ul')
    $tabLi.on('click',function(){
        $menuBox.eq($(this).index()).css('display','block').siblings().css('display','none');
        $(this).attr('class','active').siblings().attr('class','');
    })
    /*角色绑定页面用户和功能绑定的单选按钮*/
    var $tCircle=$('.layer .t-circle');
    var flag=true;
    $tCircle.on('click',function(){
        if(flag){
            $(this).attr('class','t-circle current')
        }else{
            $(this).attr('class','t-circle')
        }
        flag=!flag;
    })

    // function radio(){
    //     if(flag){
    //         this.className='t-circle current'
    //     }else{
    //         this.className='t-circle'
    //     }
    //     flag=!flag;
    // }


});
