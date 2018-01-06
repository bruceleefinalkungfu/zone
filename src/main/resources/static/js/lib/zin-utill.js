'use strict';
var app_name = "crudApp";
var zin_css = {
	title_bar_height : '20',
	zin_window_boarder_radius : '5px', 
	position_absolute : 'position: absolute;',
	border : 'border: thin solid black;',
}

function create_zin_window(is_just_opened){
	var size = get_browser_resolution();
	var height = size.height/2;
	var width =  size.width/2; 
	function get_title_bar(width){
		return '<div class="zin-title-bar" style="width:'+width+'; height:'+zin_css.title_bar_height+'px;\
		background-color:#0992e8; opacity: 0.3;\
		border-radius:'+zin_css.zin_window_boarder_radius+' '+zin_css.zin_window_boarder_radius+' 0px 0px; " ></div>';
	}
	
	var prefix =  '<div class="zin-window" id='+get_random_alphanumeric(10)+' style="'+border+'\
	width:'+width+'px; height:'+height+'px; border-radius: '+zin_css.zin_window_boarder_radius+';"';
	var suffix = '>'+get_title_bar(width)+'<div>Made by a directive!</div></div>';
	var index = 0;
	var arr=[];
	if(is_just_opened)
		arr[index++] = ' data-just-opened=true ';
	var zin_window_div = prefix;
	for(var i=0 ; i<index ; i++)
		zin_window_div += arr[i];
	zin_window_div += suffix;
	return zin_window_div;
}

function get_random_alphanumeric(size) {
	  var text = "";
	  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	  for (var i = 0; i < size ; i++)
	    text += possible.charAt(Math.floor(Math.random() * possible.length));
	  return text;
}

function get_browser_resolution() {
	/*-- java script
	var width = window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
	var height = window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;
	//*/
	return { width : $(window).width()-10, height : $(window).height()-10};
}

function set_resizable_draggable() {
	$(".zin-window").draggable({ handle: ".zin-title-bar", containment: "#zin-screen", scroll: false });
	$(".zin-window").resizable( { containment: "#zin-screen", minHeight: zin_css.title_bar_height});
}

function on_window_resize() {
	var size = get_browser_resolution();
	$("#zin-screen").width(size.width).height(size.height);
}

$(document).ready(function() {
	set_resizable_draggable();
	on_window_resize();
});


$('#zin-start-button').click(function(){
	//var new_zin_window = document.createElement('zin-window');
	console.log('#zin-start-button button clicked');
	$('#zin-screen').append(create_zin_window(true));
	// After appending it to html, bind the listener
	set_resizable_draggable();
});

// Set an event for on resizing the browser
$(window).resize(on_window_resize);