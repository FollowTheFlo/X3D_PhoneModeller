//get the element from HTML page with DOM
//change the texture and colours of the phone

var phone_select = 0;
var my_body_var="";
var my_keyboard_var="";
var my_buttons_var="";
var my_screen_var="";
var my_topcolour_var="";
var my_bottomcolour_var="";
var my_texture_var="";


var my_body_save="";
var my_keyboard_save="";
var my_buttons_save="";
var my_screen_save="";
var my_topcolour_save="";
var my_bottomcolour_save="";
var my_texture_save="";
var script_start="";
var script_end="";
var scene_script="";

///////////////////////Get data of the web page form with DOM////////////////

function get_data_form()
{

	var my_body_list = window.document.getElementById('body_list'); //get the Body list combo box element
	 my_body_var = my_body_list.options[my_body_list.selectedIndex].value; //get the slected value

	var my_keyboard_list = window.document.getElementById('keyboard_list');
	 my_keyboard_var = my_keyboard_list.options[my_keyboard_list.selectedIndex].value;

	var my_buttons_list = window.document.getElementById('buttons_list');
	 my_buttons_var = my_buttons_list.options[my_buttons_list.selectedIndex].value;
	
	var my_screen_list = window.document.getElementById('screen_list');
	 my_screen_var = my_screen_list.options[my_screen_list.selectedIndex].value;

	var my_col_body_list = window.document.getElementById('col_body_list');
	 my_bottomcolour_var = my_col_body_list.options[my_col_body_list.selectedIndex].value;
	
	var my_col_bodyTop_list = window.document.getElementById('col_bodyTop_list');
	 my_topcolour_var = my_col_bodyTop_list.options[my_col_bodyTop_list.selectedIndex].value;

	
	 change_phone(my_body_var,my_keyboard_var,my_buttons_var,my_screen_var); 
	 
	 setTimeout("change_body_colour()",1000);
}


////////////////////Replace phone of the scene by a new phone////////

function change_phone(B_type,K_type,Bu_type,S_type)
{
	//set arguments
	my_body_var = B_type;
	my_keyboard_var = K_type;
	my_buttons_var = Bu_type;
	my_screen_var = S_type;	
	
	var my_button_save = window.document.getElementById('Save'); 
	my_button_save.disabled = false;	//enable save button
	
	
	add_in_scene(is_texture(make_phone(B_type,K_type,Bu_type,S_type)));	
	phone_select = 1; //phone selected 
}

///////////////Modify colour of a target X3D node////////////

function modify_colour_X3Dnode(col,node_id)
{
	var red=0;
	var green=0;
	var blue=0;
	
	if(col=="red")
		red=1;
	else if(col=="blue")
		blue=1;
	else if(col=="green")
		green=1;
	else if(col=="white")
	{
		red=1;
		blue=1;
		green=1;
	}
	else if(col=="purple")
		{
			red=1;
			blue=1;
			green=0;
	}
	else if(col=="yellow")
			{
				red=1;
				blue=0;
				green=1;
	}
		
	var my_material = context.getNode(node_id);
	
	my_material.diffuseColor.r = red;
	  my_material.diffuseColor.g = green;
	  my_material.diffuseColor.b = blue;
	  
	
}

////////////////Check if it is body color changeable////////

function is_color_body()
{
	if(-1 == my_body_var.search(/material/) )	//check if colour or texture body
		{				//has the word 'material' in file name  
			return false;
		}
		else
		{
			return true;
		}
}


///////////////change body color//////////////////////

function change_body_colour()
{
	if(phone_select==0)	//check if a phone is selected
		alert("make your phone first!")
	else{
		
		if(!is_color_body() )	
		{
			//alert("select a body with colour, NO texture!");
			
		}
		else
		{
			get_bodyBottom_colour_form();
			get_bodyTop_colour_form();
		}
	}
	
}

//////////////Get value of bottom body on HTML form////////////

function get_bodyBottom_colour_form()
{
	var my_col_body_list = window.document.getElementById('col_body_list');
	 my_bottomcolour_var = my_col_body_list.options[my_col_body_list.selectedIndex].value;
	
	
	modify_colour_X3Dnode(my_bottomcolour_var, "my_col_body");
}

/////////////Get value of top body on HTML form/////////////////

function get_bodyTop_colour_form()
{
	var my_col_bodyTop_list = window.document.getElementById('col_bodyTop_list');
	 my_topcolour_var = my_col_bodyTop_list.options[my_col_bodyTop_list.selectedIndex].value;

	modify_colour_X3Dnode(my_topcolour_var, "my_col_top");
}


function save_phone()
{
	my_body_save = my_body_var;
	my_keyboard_save = my_keyboard_var;
	my_buttons_save = my_buttons_var;
	my_screen_save = my_screen_var;
	my_topcolour_save = my_topcolour_var;
	my_bottomcolour_save = my_bottomcolour_var;
	my_texture_save= my_texture_var;
	
	alert("Phone saved in memory");
	
	var my_button_display_saved = window.document.getElementById('Display_saved'); 
	my_button_display_saved.disabled = false;	//enable save button

}

function display_phone_save()
{
		my_body_var = my_body_save;
		my_keyboard_var = my_keyboard_save;
		my_buttons_var = my_buttons_save;
		my_screen_var = my_screen_save;
		my_topcolour_var = my_topcolour_save;
		my_bottomcolour_var = my_bottomcolour_save;
		my_texture_var = my_texture_save;
	
	
	scene_script = make_phone(my_body_save,my_keyboard_save,my_buttons_save,my_screen_save); 


	
	if(!is_color_body() )
	{
		//wrap the phone with saved texture
		scene_script = replace_imagepath(scene_script,my_texture_var);
	
	}
	
	add_in_scene(scene_script); //display the phone in the scene
	
	if(is_color_body())
		{
			//color can be changed once the phone displayed
			//alert("process color");
			
			setTimeout("modify_colour_X3Dnode(my_bottomcolour_save,'my_col_body')",2000);
			setTimeout("modify_colour_X3Dnode(my_topcolour_save,'my_col_top')",500);
	}
}


function add_in_scene (str)
{
	scene = browser.createX3DFromString(str);
	browser.replaceWorld(scene);
}


function make_phone(B_id,K_id,Bu_id,S_id)
{

	var my_phone = new Phone();

	my_phone.makeKeyboard(K_id);

	my_phone.makeButtons(Bu_id);

	my_phone.makeScreen(S_id);

	my_phone.makeBody(B_id);

	//resize phone parts to fit the body size
	
	my_phone.fit_keyboard();
	my_phone.fit_buttons();
	my_phone.fit_screen();

	//translate phone parts at the target location on the body
	
	my_phone.get_keyboard_translation();
	my_phone.get_buttons_translation();
	my_phone.get_screen_translation();
	
	//combine all phone parts scripts to get the final script 
	
	script_start='DEF boule Transform { translation -5 5 -2 center 0 0 0 children [  Shape {geometry Sphere {radius 0.7} appearance Appearance { texture ImageTexture { url [ "textures/spin.png" ] } } }DEF my_touch_spin TouchSensor { } ]} DEF boddy Transform { children [';
	
	script_end=']} DEF my_time_spin TimeSensor{ cycleInterval 5}DEF my_spin OrientationInterpolator {key [ 0.00, 0.33, 0.66, 0.99 ]keyValue [ 0 1 0 0.00, 0 1 0 1.57, 0 1 0 3.14, 0 1 0 6,28 ]}ROUTE my_touch_spin.touchTime TO my_time_spin.set_startTime ROUTE my_time_spin.fraction_changed TO my_spin.set_fraction ROUTE my_spin.value_changed TO boddy.set_rotation ROUTE my_spin.value_changed TO boule.set_rotation  Viewpoint {position 0 0 15} NavigationInfo {type [ "EXAMINE" ] }';
	
	scene_script = script_start+my_phone.combine_scripts()+script_end;
		
	return scene_script;
		
}


function is_texture(scene_script)
{
if(!is_color_body() )	//texture body chosen so open dialogue box
	{
		
		var image_path = get_dialogbox(); //open dialogue box
		
		script2 = replace_imagepath(scene_script,image_path); //replace url in the script
		return script2;			
	}
	else{
	return scene_script;
	}
}


function get_dialogbox()
{
	//display dialog box and ask the user to enter path
	
	var my_image = "textures/peace.jpg";	//default path if the user cancel
	var res=prompt("Enter url of the image","textures/peace.jpg");
	
	if(res != null)
	{
		my_image = res;
		my_texture_var = res; //set the attribute
	}
	return my_image;
}


function replace_imagepath(my_script,image_url)
{
	//replace word 'ici' in the script by the image url
	
	var nouvo_script = my_script.replace(/ici/,image_url);
	return nouvo_script;
}

