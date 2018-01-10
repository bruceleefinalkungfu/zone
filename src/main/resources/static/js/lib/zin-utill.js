/**
 * Done
 * 		-set min height and width of zin windows
 * 		-browser resize, all windows resize, relocate
 * 		-add vertical, horizontal scroll bars when text is going outside of div
 * 		-Don't use dot notation when key coming from a variable,
 * 		 	suppose your obj is, var zin ={ abc : 3, defg : 4}
 * 		 	note it's NOT var zin ={ 'abc' : 3, 'defg' : 4}
 *			now, var key = 'abc';
 *			alert(zin.key) will give undefined because you're searching with string key
 *			alert(zin.abc) will give 3 though
 *			alert(zin[key]) works too
 *			alert(zin[abc]) will give a syntax error saying abc is not defined
 *		-keep track of id and z-index and change z-index on click on a zin-window
 * Tasks
 * 		-Title bar
 * 			- A title floating left explaining the title. overflow hidden
 * 			- add close and functionalities
 * 		progress
 * 			- add minimize which only makes them small
 * 			- add total minimize which sends them to task bar
 * 			- add a button to simulate window+left and window+right
 * 			- add maximize which makes it fullscreen n hides task bar. size=screen.size
 * 		-Windows to have innerhtml from server
 * 		-Task bar
 * 			- to keep track of all the zin-windows and start button
 * 		-Refactoring the code
 * 			Replace \ with + to concatenate
 * 		
 */
var zin_css = {
	title_bar_height : '25',
	title_bar_opacity : '0.8',
	title_bar_close_button_color : 'red',
	title_bar_maximize_button_color : 'yellow',
	title_bar_minimize_button_color : '#00fc00',
	 
	position_absolute : 'position: absolute;',
	border : 'border: thin solid black;',
	title_bar_borders : 'border-left: 1px solid; border-bottom: 1px solid;',
	
	zin_window_border_radius : '4px',
	zin_window_background_color : 'white',
	zin_window_scrollbar : 'overflow-x: scroll; overflow-y: scroll;',
	
	zin_dynamic_content_opacity : 0.92,
}
var zin_var = {
		debug : true,
		debug_log : '',
		
		zin_window_minimum_height : (zin_css.title_bar_height * 2),
		zin_window_minimum_width : (zin_css.title_bar_height * 8),
		
		space_between_zin_screen_and_zin_window_top : 1,
		
		subtracted_from_browser_resolution : 5,
}
var top_z_index = -1;
var zin_window_map = new Object();

function add_to_zin_window_map(id, z_index) {
	zin_window_map[id] = z_index;
}
function close_zin_window(id) {
	var id_z_index = zin_window_map[id];
	delete zin_window_map[id];
	var elem = $('#'+id);
	unbind_events_on_window(id);
	elem.remove();
	top_z_index--;
	decrease_all_z_index_if_greater_than(id_z_index);
}

function get_zin_window(){
	var size = get_browser_resolution();
	var height = size.height/2;
	var width =  size.width/2; 
	function get_title_bar(width, title_text){
		var width = width+'px';
		var height = zin_css.title_bar_height + 'px';
		var inner_div = "";
		var title_left = "<div class='zin-title' style='height:"+height+"; float:left; "
		+"; border-radius:"+zin_css.zin_window_border_radius+" 0px 0px 0px; overflow:hidden;'>"+title_text+"</div>";
		var close_button_right = "<div class='zin-close-button' style='height:"+height+"; width:"+height+"; float:right; "+zin_css.title_bar_borders
			+"background-color:"+zin_css.title_bar_close_button_color+"; border-radius:0px "+zin_css.zin_window_border_radius+" 0px 0px; '></div>";
		var maximize_button_right = "<div class='zin-maximize-button' style='height:"+height+"; width:"+height+"; float:right; "
			+"background-color:"+zin_css.title_bar_maximize_button_color+"; "+zin_css.title_bar_borders+"; '></div>";
		var minimize_button_right = "<div class='zin-minimize-button' style='height:"+height+"; width:"+height+"; float:right; "
				+"background-color:"+zin_css.title_bar_minimize_button_color+"; "+zin_css.title_bar_borders+"; '></div>";
		inner_div += (title_left + close_button_right + maximize_button_right + minimize_button_right);
		// Don't set the width of child div, because default width is auto.
		// and div is a block-level element, they will take full space automatically
		return '<div class="zin-title-bar" style="min-height:'+height+';\
		background-color:#0992e8;\
		opacity:'+zin_css.title_bar_opacity+';\
		border-collapse: collapse;\
		border-radius:'+zin_css.zin_window_border_radius+' '+zin_css.zin_window_border_radius+' 0px 0px; " >\
		'+inner_div+'</div>';
	}
	var id = get_random_alphanumeric(10);
	var prefix =  '<div class="zin-window" id='+id+' style="'+zin_css.border+'\
	width:'+width+'px; height:'+height+'px; border-radius: '+zin_css.zin_window_border_radius+';\
	display: flex; flex-direction: column;\
	'+zin_css.position_absolute+' z-index: '+(++top_z_index)+';\
	"';
	var suffix = '>'+get_title_bar(width, 'title_text')+'<div class="zin-dynamic-content" style="\
	background-color:'+zin_css.zin_window_background_color+'; '+zin_css.zin_window_scrollbar+'\
	flex-grow: 1; opacity:'+zin_css.zin_dynamic_content_opacity+';\
	">\
	Made by a directive. It will come from server side!<h1>'+id+' '+top_z_index+'</h1> <textarea> </textarea> </div></div>';
	var index = 0;
	var zin_window_div = prefix;
	zin_window_div += suffix;
	add_to_zin_window_map(id, top_z_index);
	return {id : id, div : zin_window_div};
}

function get_random_alphanumeric(size) {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (var i = 0; i < size ; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	return text;
}

// returns without px suffix
function get_zin_screen_resolution() {
	var elem = $('#zin-screen');
	return { width : parseInt(elem.css('width')) , height : parseInt(elem.css('height'))};
}

// returns without px suffix
function get_browser_resolution() {
	/*-- java script
	var width = window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
	var height = window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;
	//*/
	return { width : $(window).width()-zin_var.subtracted_from_browser_resolution, height : $(window).height()-zin_var.subtracted_from_browser_resolution};
}

function change_zin_window_size(id, width, height, is_maximize) {
	var elem = $('#'+id).css('width', width+'px').css('height', height+'px');
	if(is_maximize) {
		elem.css('top', zin_var.space_between_zin_screen_and_zin_window_top+'px')
		.css('left', zin_var.space_between_zin_screen_and_zin_window_top+'px');
	}
}

function unbind_events_on_window(id) {
	$("#"+id).draggable('disable')
	.resizable('disable')
	.off('mousedown');
	var title_bar = $("#"+id).children('.zin-title-bar');
	title_bar.children('.zin-close-button').off('click');
	title_bar.children('.zin-maximize-button').off('click');
	title_bar.off('dblclick');
}

function bind_events_on_window(id) {
	var elem = $("#"+id).draggable({ handle: ".zin-title-bar", containment: "#zin-screen", scroll: false })
	.resizable({ containment: "#zin-screen", handles: 'n, e, s, w, se, ne, sw, nw',
		minHeight: zin_var.zin_window_minimum_height, minWidth: zin_var.zin_window_minimum_width})
	.mousedown(function(){ on_zin_window_click(this); })
	var title_bar = elem.children('.zin-title-bar');
	title_bar.children('.zin-close-button').click(function(){
		close_zin_window(id);
	});
	title_bar.children('.zin-maximize-button').click(function(){
		maximize_zin_window(id);
	});
	title_bar.dblclick(function(){
		maximize_zin_window(id);
	});
}

function maximize_zin_window(id) {
	var elem = $("#"+id);
	var size = get_zin_screen_resolution();
	size.width = size.width - 2*zin_var.space_between_zin_screen_and_zin_window_top;
	size.height = size.height - 2*zin_var.space_between_zin_screen_and_zin_window_top;
	var changed_width = size.width;
	var changed_height = size.height;
	if( parseInt(elem.css('width')) >= size.width && parseInt(elem.css('height')) >= size.height ){
		changed_height = size.height/2;
		changed_width = size.width/2;
	}
	change_zin_window_size(id, changed_width, changed_height, true);
}

function decrease_all_z_index_if_greater_than (this_z_index) {
	Object.keys(zin_window_map).forEach(function (key) {
		if(zin_window_map[key] > this_z_index){
			$('#'+key).css('z-index', --zin_window_map[key]);
		}
	});
} 

function on_window_resize() {
	var size = get_browser_resolution();
	$('.zin-window').each(function(){
		var elem = this;
		var current_top = parseInt($(elem).css('top'));
		var current_left = parseInt($(elem).css('left'));
		var current_width = parseInt($(elem).css('width'));
		var current_height = parseInt($(elem).css('height'));
		var current_x2 = current_left + current_width;
		var current_y2 = current_top + current_height;
		if(current_x2 > size.width) {
			current_left = current_left - (current_x2 - size.width);
			if (current_left < 1) {
				current_width = current_width - (1 - current_left);
				current_left = 1;
			}
		}
		if(current_y2 > size.height) {
			current_top = current_top - (current_y2 - size.height);
			if (current_top < 1) {
				current_height = current_height - (1 - current_top);
				current_top = 1;
			}
		}
		current_top = current_top + 'px';
		current_left = current_left + 'px';
		current_height = current_height + 'px';
		current_width = current_width + 'px';
		$(elem).css('top', current_top).css('left', current_left)
		.css('width', current_width).css('height', current_height);
	});
	$("#zin-screen").width(size.width+'px').height(size.height+'px');
}

$(document).ready(function() {
	on_window_resize();
});

function on_zin_window_click(elem) {
	var zin_window_id = $(elem).attr('id');
	var its_z_index = zin_window_map[zin_window_id];
	decrease_all_z_index_if_greater_than(its_z_index);
	//$('#'+zin_window_id).css('width', zin_screen_elem.css('width')).css('height', zin_screen_elem.css('height'));
	zin_window_map[zin_window_id] = top_z_index;
	$(elem).css('z-index', top_z_index);
}

function create_zin_window() {
	zdebug('about to create zin_window');
	var zin_window_returned_obj = get_zin_window();
	$('#zin-screen').append(zin_window_returned_obj.div);
	bind_events_on_window(zin_window_returned_obj.id);
	zdebug('success!')
}

$('#zin-start-button').click(create_zin_window);
$('#zin-start-button2').click(function(){
	//var new_zin_window = document.createElement('zin-window');
	a='';
	close_zin_window(a);
});

// Set an event for on resizing the browser
$(window).resize(on_window_resize);

function zdebug(msg) {
	if(zin_var.debug){
		var today = new Date();
		var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
		var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		var dateTime = date+' '+time;
		console.log(dateTime+' - '+msg);
		zin_var.debug_log += (dateTime+' - '+msg+'\n');
	}
}