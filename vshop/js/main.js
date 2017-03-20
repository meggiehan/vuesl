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
    });

    /*点击显示是否下拉*/
    $('.tab .click-btn').on('click',function(){
        $.each($('.down-m'),function(i,elem){
            $(elem).fadeOut();
        })
        $(this).siblings('.down-m').fadeToggle();
        return false;
    });
    /*下拉点击选取文字*/
    $('.down p>a').on('click',function(){
        $(this).parents('.down').children().children('em').text($(this).text())
    })

    /*创建用户*/
    $('.build>.btn-info').on('click',function(){
        $('.main .layer').fadeIn();
        $('.main .role').fadeIn();
    })
    $('.btn-t .btn').on('click',function(){
        $('.main .layer').fadeOut();
        $('.main .role').fadeOut();
        $('.supply').fadeOut();
        $('.power').fadeOut();
    })

    $('.table .pw').on('click',function(){
        $('.power').fadeIn();
    })

    /*单选按钮封装*/
    function radio_toggle($circleAll) {
        $circleAll.on('click',function(){
            $.each($circleAll,function(i,elem){
                $(elem).removeClass('current');
            })
            $(this).addClass('current');
        });
    };
    /*角色页面弹出层单选按钮*/
    $circle_active=$('.main .layer .circle');
    radio_toggle($circle_active);
    /*供应商创建用户弹出层单选按钮*/
    $circle_month=$('.main .role .circle_month .circle');
    $circle_quarterly=$('.main .role .circle_quarterly .circle');
    $circle_year=$('.main .role .circle_year .circle');
    radio_toggle($circle_month);
    radio_toggle($circle_quarterly);
    radio_toggle($circle_year);

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
    });

    /*封装tab选项卡切换*/
    function tab_toggle($lis,$boxes) {
        $lis.on('click',function(){
            $(this).attr('class','active').siblings().attr('class','');
            $boxes.eq($(this).index()).css('display','block').siblings().css('display','none');
        });
    };
    /*角色绑定弹出层tab选项卡*/
    var $tabLi = $('.layer .menu-hd>li');
    var $menuBox = $('.layer .menu-box ul');
    tab_toggle($tabLi,$menuBox);
    /*供应商创建用户弹出层tab切换*/
    var $menuDiv = $('.role .role-menu-box>div');
    var $roleLi=$('.role .menu-hd>li');
    tab_toggle($roleLi,$menuDiv);
    /*用户权限 tab栏*/
    var $powerLi=$('.power .menu-hd>li');
    var $powerDiv = $('.power .menu-box>div');
    tab_toggle($powerLi,$powerDiv);

    /*角色绑定页面用户和功能绑定的单选按钮*/
    $(".menu-box ul li").click(function(event) {
        if ($(this).children('i').attr("class") == "t-circle") {
            $(this).children('i').attr("class","t-circle current");
        }else {
            $(this).children('i').attr("class","t-circle");
        }
    });

   /*点击注册供应商按钮弹出层*/
    $('.build .btn-success').on('click',function(){
        $('.supply').fadeIn();
    })
	
	/*power层里的全选*/
    var $tCircleP=$('.power .all-check p')
    // $('.all-check p').on('click',function(){
    //     if($(this).children('i').attr('class')=='t-circle all'){
    //         $(this).children('i').attr('class','t-circle');
    //         $tCircle.attr('class','t-circle');
    //     }else{
    //         $(this).children('i').attr('class','t-circle all');
    //         $tCircle.attr('class','t-circle current');
    //     }
    // })
    $tCircleP.on('click',function(){
        if($(this).children('i').attr('class')=='t-circle all'){
            $(this).children('i').attr('class','t-circle');
           $(this).parents('.all-checkbox').children('ul').children().children('i').attr('class','t-circle');
        }else{
            $(this).children('i').attr('class','t-circle all');
           $(this).parents('.all-checkbox').children('ul').children().children('i').attr('class','t-circle current');
        }
    });
    /*有一个未选 全选取消*/



});
