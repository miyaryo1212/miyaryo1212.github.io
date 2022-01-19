// Copyright(C)2016 Cafi Net All Rights Reserved.[128]
// 利用規約 http://japanism.info/free-template.html#template

$(function(){
// 調整用 ここから
	var back_top_speed = 500; // トップへ戻るスピード（back-top.png をクリックしたとき）
	var nav_speed = 300; // スマートフォンメニューの表示スピード
	var nav_scroll_speed = 300; // メニュースクロールスピード
	var menu_hover = 300; // リンク hover アクションのスピード	
	var min_width = 800; // ブレークポイント[800]
// 調整用 ここまで

	var menu_button = $('#menu_button');
	var nav = $('#main_menu nav');
	var back_top = $('#back_top');
	var touch_start = ('ontouchstart' in window);
	var window_width = $(window).width();
	if (window_width > min_width) {
		$(window).scroll(function(){
			if ($(window).scrollTop() > 1000) {
				back_top.fadeIn('fast');
			} else {
				back_top.fadeOut('fast');
			}
		});
		back_top.click(function(){
			$('body,html').animate({scrollTop: '0px'}, back_top_speed, 'swing');
		});
	}
	function window_control () {
		menu_button.unbind();
		nav.unbind();
		window_width = $(window).width();
		if (window_width < min_width) {
			var nav_height = nav.height();
			if(nav.css('margin-top') <= '0px') {
				nav.css('margin-top', '-' + nav_height + 'px');
			}
			menu_button.click(function(){
				if(nav.css('margin-top') === '-' + nav_height + 'px') {
					nav.animate({'margin-top': '0px'}, nav_speed, 'linear');
					$('#menu_button_line').addClass('close');
					$('#overlay').fadeIn('fast');
				} else {
					nav.animate({'margin-top': '-' + nav_height + 'px'}, nav_speed, 'linear');
					$('#menu_button_line').removeClass('close');
					$('#overlay').fadeOut('fast');
				}
			});
			$('#nav_mo nav ul li a').click(function(){	
				if(window_width < min_width && nav.css('margin-top') <= '0px') {
					nav.animate({'margin-top': '-' + nav_height + 'px'}, nav_speed, 'linear');
					$('#menu_button_line').removeClass('close');
					$('#overlay').fadeOut('fast');
				}			
			});
		} else {
			if(nav.css('margin-top') <= '0px') {
				nav.css('margin-top', '0px');
			}
		}
		$('#menu_button_line').removeClass('close');
		$('#overlay').css('display', 'none');
		var header_height = $('header').height();
		if (window_width >= min_width) {
			$('a[href^=#block]').click(function(){
				var id = $($(this).attr('href')).offset().top;
				$('body,html').animate({scrollTop:id - header_height +'px'}, nav_scroll_speed, 'swing');
				return false;
			});
		} else {
			$('a[href^=#block]').click(function(){
				var id = $($(this).attr('href')).offset().top;
				$('body,html').animate({scrollTop:id +'px'}, nav_scroll_speed, 'swing');
				return false;
			});
		}
		if (touch_start === false) {
			$('body a').hover(function(){
				$(this).stop().animate({opacity: 0.3}, menu_hover);
			},
			function(){
				$(this).stop().animate({opacity: 1}, menu_hover);
			});		
		}
	}
	$(window).load(function(){
		window_control();
	});
	$(window).resize(function(){
		window_control();
	});
});